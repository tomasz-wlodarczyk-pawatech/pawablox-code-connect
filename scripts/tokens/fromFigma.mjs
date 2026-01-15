const TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const URL_BASE = 'https://api.figma.com/v1/files';

export async function getFileVariables(fileKey) {
  const response = await fetch(`${URL_BASE}/${fileKey}/variables/local`, {
    method: 'GET',
    headers: { 'X-FIGMA-TOKEN': TOKEN },
  });

  if (!response.ok) {
    throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return parseVariablesResponse(data);
}

export async function getFileStyles(fileKey) {
  const response = await fetch(`${URL_BASE}/${fileKey}`, {
    method: 'GET',
    headers: { 'X-FIGMA-TOKEN': TOKEN },
  });

  if (!response.ok) {
    throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return parseStylesResponse(data);
}

function parseVariablesResponse(response) {
  const { variableCollections, variables } = response.meta;

  const collections = {};

  for (const collectionId in variableCollections) {
    const collection = variableCollections[collectionId];
    if (collection.remote) continue;

    const collectionName = sanitizeName(collection.name);
    collections[collectionName] = {
      name: collection.name,
      modes: collection.modes.map((m) => ({ id: m.modeId, name: m.name })),
      variables: [],
    };

    for (const variableId of collection.variableIds) {
      const variable = variables[variableId];
      if (!variable || variable.deletedButReferenced) continue;

      const defaultModeId = collection.modes[0].modeId;
      const value = variable.valuesByMode[defaultModeId];

      if (value === undefined) continue;

      const parsedVariable = {
        id: variableId,
        name: variable.name,
        type: variable.resolvedType,
        description: variable.description || '',
        value: parseValue(value, variable.resolvedType, variables, variableCollections),
        valuesByMode: {},
      };

      for (const mode of collection.modes) {
        const modeValue = variable.valuesByMode[mode.modeId];
        parsedVariable.valuesByMode[mode.name] = parseValue(
          modeValue,
          variable.resolvedType,
          variables,
          variableCollections
        );
      }

      collections[collectionName].variables.push(parsedVariable);
    }
  }

  return collections;
}

function parseValue(value, type, variables, collections) {
  if (value && value.type === 'VARIABLE_ALIAS') {
    const aliasVariable = variables[value.id];
    if (aliasVariable) {
      const collection = collections[aliasVariable.variableCollectionId];
      const collectionName = collection ? sanitizeName(collection.name) : 'unknown';
      return {
        type: 'alias',
        collection: collectionName,
        name: aliasVariable.name,
      };
    }
    return { type: 'alias', name: 'unknown' };
  }

  if (type === 'COLOR') {
    return rgbToHex(value);
  }

  return value;
}

function parseStylesResponse(response) {
  const styles = response.styles || {};
  const textStyles = [];
  const effectStyles = [];

  traverseNode(response.document);

  function traverseNode(node) {
    if (node.styles) {
      for (const styleType in node.styles) {
        const styleId = node.styles[styleType];
        const style = styles[styleId];

        if (!style || style.remote) continue;

        if (styleType === 'text' && !textStyles.find((s) => s.id === styleId)) {
          textStyles.push({
            id: styleId,
            name: style.name,
            fontSize: node.style?.fontSize || node.fontSize,
            fontFamily: node.style?.fontFamily || node.fontFamily,
            fontWeight: node.style?.fontWeight || node.fontWeight,
            lineHeight: node.style?.lineHeightPx || node.lineHeightPx,
            letterSpacing: node.style?.letterSpacing || node.letterSpacing,
          });
        }

        if (styleType === 'effect' && !effectStyles.find((s) => s.id === styleId)) {
          effectStyles.push({
            id: styleId,
            name: style.name,
            effects: node.effects,
          });
        }
      }
    }

    if (node.children) {
      node.children.forEach(traverseNode);
    }
  }

  return { textStyles, effectStyles };
}

function sanitizeName(name) {
  return name
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .trim()
    .replace(/ +/g, '_')
    .toLowerCase();
}

function rgbToHex({ r, g, b, a }) {
  const toHex = (value) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const hex = [toHex(r), toHex(g), toHex(b)];
  if (a !== undefined && a !== 1) {
    hex.push(toHex(a));
  }
  return `#${hex.join('')}`;
}
