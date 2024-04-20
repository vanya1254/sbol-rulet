import { encoded, translations } from "./data.js";

console.log("Let's rock");
console.log(encoded, translations);

const decode = (en, trans) => {
  let wrongIds = [];
  const uniqueIds = [];
  const tempTrans = { ...trans };

  const decoded = en.map((e) => {
    const tempEn = { ...e };

    delete tempEn.groupId;
    delete tempEn.service;
    delete tempEn.formatSize;
    delete tempEn.ca;

    for (const [key, val] of Object.entries(tempEn)) {
      if (key.includes("Id") && val !== null) {
        if (trans[val] !== undefined) {
          tempEn[key] = trans[val];

          if (typeof tempTrans[val] === "string") {
            tempTrans[val] = 1;
          } else {
            tempTrans[val] += 1;
          }
        } else {
          wrongIds.push(val);
        }
      }
    }

    return {
      ...tempEn,
      groupId: e.groupId,
      service: e.service,
      formatSize: e.formatSize,
      ca: e.ca,
    };
  });

  for (const [key, val] of Object.entries(tempTrans)) {
    if (val === 1) {
      uniqueIds.push(key);
    }
  }

  wrongIds = [...new Set(wrongIds)];

  return [decoded, wrongIds, uniqueIds];
};

const [decoded, wrongIds, uniqueIds] = decode(encoded, translations);

console.log(decoded, wrongIds, uniqueIds);
//////trans[val]/////LILII
