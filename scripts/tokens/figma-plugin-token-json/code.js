var KEY_PREFIX_COLLECTION = "@";
var NAMESPACE = "com.pawablox";

figma.notify("🚀 Starting pawaBlox Token Export...");
exportToJSON();

function exportToJSON() {
  try {
    var collections = figma.variables.getLocalVariableCollections();

    figma.notify("Found " + collections.length + " variable collections");

    if (collections.length === 0) {
      figma.showUI(
        '<div style="padding: 20px; font-family: system-ui;">' +
          "<h2>No Variables Found</h2>" +
          "<p>This file doesn't have any local variable collections.</p>" +
          "<p>Make sure you have variables defined in this Figma file.</p>" +
          "</div>",
        { width: 400, height: 200, title: "pawaBlox Token Export" }
      );
      return;
    }

    var object = {};
    var maps = uniqueKeyIdMaps(collections, "id", KEY_PREFIX_COLLECTION);
    var idToKey = maps.idToKey;

    collections.forEach(function (collection) {
      object[idToKey[collection.id]] = collectionAsJSON(idToKey, collection);
    });

    getStyles().then(function (styles) {
      figma.showUI(
        [
          "<style>",
          "body { margin: 0; font-family: system-ui; padding: 8px; }",
          "textarea { width: 100%; height: 40vh; overflow-y: auto; font-size: 11px; font-family: monospace; }",
          "h3 { margin: 8px 0 4px 0; font-size: 12px; }",
          "p { margin: 4px 0; font-size: 11px; color: #666; }",
          "button { margin: 4px 0; padding: 6px 12px; cursor: pointer; background: #18a0fb; color: white; border: none; border-radius: 4px; }",
          "button:hover { background: #0d8de5; }",
          "</style>",
          "<h3>Variables (tokens.json)</h3>",
          "<p>Select all (Cmd+A) and copy (Cmd+C), then save to scripts/tokens/cache/tokens.json</p>",
          '<textarea id="tokens" onclick="this.select()">' + JSON.stringify(object, null, 2) + "</textarea>",
          '<button onclick="var t=document.getElementById(\'tokens\'); t.select(); document.execCommand(\'copy\'); alert(\'Copied!\')">Select & Copy Variables</button>',
          "<h3>Styles (styles.json)</h3>",
          '<textarea id="styles" onclick="this.select()">' + styles + "</textarea>",
          '<button onclick="var t=document.getElementById(\'styles\'); t.select(); document.execCommand(\'copy\'); alert(\'Copied!\')">Select & Copy Styles</button>',
        ].join("\n"),
        {
          width: 700,
          height: 700,
          title: "pawaBlox Token Export",
        }
      );

      figma.notify("✅ Export complete! Copy the JSON from the panel.");
    });
  } catch (error) {
    figma.notify("❌ Error: " + error.message, { error: true });
    figma.showUI(
      '<div style="padding: 20px; font-family: system-ui; color: red;">' +
        "<h2>Error</h2>" +
        "<pre>" +
        error.message +
        "\n" +
        error.stack +
        "</pre>" +
        "</div>",
      { width: 500, height: 300, title: "pawaBlox Token Export - Error" }
    );
  }
}

function collectionAsJSON(collectionIdToKeyMap, collectionData) {
  var name = collectionData.name;
  var modes = collectionData.modes;
  var variableIds = collectionData.variableIds;
  var figmaId = collectionData.id;

  var collection = {};
  var maps = uniqueKeyIdMaps(modes, "modeId");
  var idToKey = maps.idToKey;
  var keyToId = maps.keyToId;
  var modeKeys = Object.values(idToKey);

  var extensions = {};
  extensions[NAMESPACE] = { figmaId: figmaId, modes: modeKeys };
  collection.$extensions = extensions;

  variableIds.forEach(function (variableId) {
    var variable = figma.variables.getVariableById(variableId);
    if (!variable) return;

    var varName = variable.name;
    var resolvedType = variable.resolvedType;
    var valuesByMode = variable.valuesByMode;
    var description = variable.description;
    var value = valuesByMode[keyToId[modeKeys[0]]];

    var fontWeight =
      resolvedType === "FLOAT" &&
      Boolean(varName.match(/\/?weight/i)) &&
      "fontWeight";
    var fontFamily =
      resolvedType === "STRING" &&
      Boolean(varName.match(/\/?family/i)) &&
      "fontFamily";

    if (
      (value !== undefined &&
        ["COLOR", "FLOAT", "STRING"].indexOf(resolvedType) !== -1) ||
      fontFamily
    ) {
      var obj = collection;
      varName.split("/").forEach(function (groupName) {
        var safeName = groupName
          .split(/[^\da-zA-Z]+/)
          .join("-")
          .toLowerCase();
        obj[safeName] = obj[safeName] || {};
        obj = obj[safeName];
      });

      obj.$type =
        resolvedType === "COLOR"
          ? "color"
          : resolvedType === "FLOAT"
            ? fontWeight || "number"
            : fontFamily || "unknown";
      obj.$value = valueToJSON(value, resolvedType, collectionIdToKeyMap);
      obj.$description = description || "";

      var varExtensions = {};
      var modeValues = {};
      modeKeys.forEach(function (modeKey) {
        modeValues[modeKey] = valueToJSON(
          valuesByMode[keyToId[modeKey]],
          resolvedType,
          collectionIdToKeyMap
        );
      });
      varExtensions[NAMESPACE] = {
        figmaId: variableId,
        modes: modeValues,
      };
      obj.$extensions = varExtensions;
    }
  });

  return collection;
}

function valueToJSON(value, resolvedType, collectionIdToKeyMap) {
  if (value && value.type === "VARIABLE_ALIAS") {
    var variable = figma.variables.getVariableById(value.id);
    if (!variable) return "UNKNOWN";
    var prefix = collectionIdToKeyMap[variable.variableCollectionId];
    return "{" + prefix + "." + variable.name.replace(/\//g, ".") + "}";
  }
  return resolvedType === "COLOR" ? rgbToHex(value) : value;
}

function uniqueKeyIdMaps(nodesWithNames, idKey, prefix) {
  prefix = prefix || "";
  var idToKey = {};
  var keyToId = {};

  nodesWithNames.forEach(function (node) {
    var key = sanitizeName(node.name);
    var int = 2;
    var uniqueKey = prefix + key;
    while (keyToId[uniqueKey]) {
      uniqueKey = prefix + key + "_" + int;
      int++;
    }
    keyToId[uniqueKey] = node[idKey];
    idToKey[node[idKey]] = uniqueKey;
  });

  return { idToKey: idToKey, keyToId: keyToId };
}

function sanitizeName(name) {
  return name
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/^ +/, "")
    .replace(/ +$/, "")
    .replace(/ +/g, "_")
    .toLowerCase();
}

function rgbToHex(color) {
  var r = color.r;
  var g = color.g;
  var b = color.b;
  var a = color.a;

  function toHex(value) {
    var hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }

  var hex = [toHex(r), toHex(g), toHex(b)];
  if (a !== 1) {
    hex.push(toHex(a));
  }
  return "#" + hex.join("");
}

function colorToHex(color) {
  var r = color.r;
  var g = color.g;
  var b = color.b;
  var a = color.a;

  function toHex(value) {
    var hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }

  var hex = [toHex(r), toHex(g), toHex(b)];
  if (a !== 1) {
    hex.push(toHex(a));
  }
  return "#" + hex.join("");
}

function getStyles() {
  var payload = [];

  return figma
    .getLocalEffectStylesAsync()
    .then(function (effectStyles) {
      effectStyles.forEach(function (style) {
        var newEffects = style.effects
          .filter(function (a) {
            return a.visible;
          })
          .map(function (effect) {
            var variables = {};
            for (var property in effect.boundVariables) {
              var v = figma.variables.getVariableById(
                effect.boundVariables[property].id
              );
              if (v) variables[property] = v.name;
            }
            var hex = effect.color ? colorToHex(effect.color) : null;

            var result = {};
            for (var key in effect) {
              result[key] = effect[key];
            }
            result.hex = hex;
            result.variables = variables;
            return result;
          });
        payload.push({ type: "EFFECT", name: style.name, effects: newEffects });
      });

      return figma.getLocalTextStylesAsync();
    })
    .then(function (textStyles) {
      textStyles.forEach(function (style) {
        var variables = {};
        for (var property in style.boundVariables) {
          var v = figma.variables.getVariableById(
            style.boundVariables[property].id
          );
          if (v) variables[property] = v.name;
        }
        payload.push({
          type: "TEXT",
          name: style.name,
          fontSize: style.fontSize,
          fontFamily: style.fontName ? style.fontName.family : null,
          fontWeight: style.fontName ? style.fontName.style : null,
          letterSpacing: style.letterSpacing,
          lineHeight: style.lineHeight,
          textCase: style.textCase,
          textDecoration: style.textDecoration,
          variables: variables,
        });
      });

      return JSON.stringify(payload, null, 2);
    });
}
