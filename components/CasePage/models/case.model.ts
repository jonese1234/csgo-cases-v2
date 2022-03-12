export interface Case {
    name:                 string;
    "cost of case":       number;
    "cost of key":        number;
    "average return":     number;
    roi:                  number;
    "Average mill-spec":  number;
    "Average restricted": number;
    "Average classified": number;
    "Average covert":     number;
    "Average special":    number;
    "skin values":        Skin[];
}

export interface Skin {
    name: string;
    wears:  Wear[];
    prices: { [key: string]: number };
    rarity: Rarity;
}

export enum Rarity {
    Classified = "Classified",
    MilSpecGrade = "Mil-Spec Grade",
    Restricted = "Restricted",
    Covert = "Covert",
    Special = "Special",
}

export enum Wear {
    Bs = "BS",
    Fn = "FN",
    Ft = "FT",
    Mw = "MW",
    StBs = "ST BS",
    StFn = "ST FN",
    StFt = "ST FT",
    StMw = "ST MW",
    StWw = "ST WW",
    Ww = "WW",
}

export function CaseMapper(jsonObject: any): Case {
    let result: Case = {
        name: jsonObject['name'],
        "cost of case": jsonObject['cost of case'],
        "cost of key": jsonObject['cost of key'],
        "average return": jsonObject['average return'],
        "Average mill-spec": jsonObject['Average mill-spec'],
        "Average restricted": jsonObject['Average restricted'],
        "Average classified": jsonObject['Average classified'],
        "Average covert": jsonObject['Average covert'],
        "Average special": jsonObject['Average special'],
        roi: jsonObject['roi'],
        "skin values": [],
    };

    for (const id in jsonObject['skin values']){
        let _data = jsonObject['skin values'][id];
        let name = Object.keys(_data)[0];
        let data = _data[name];
        let skin: Skin = {
            name: name,
            wears: data["wears"] as Wear[],
            prices: data["prices"],
            rarity: data["rarity"] as Rarity
        };
        result["skin values"].push(skin);
    }

    return result;
}