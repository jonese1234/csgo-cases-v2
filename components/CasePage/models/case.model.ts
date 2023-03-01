import { useContext } from "react";
import { FilterContext } from "../../Contexts/MarketContext";

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
    MilSpecGrade = "Milspec",
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

export function CaseMapper(jsonObject: any, marketName: string): Case {
    // Find market
    let market = jsonObject.MarketPlaces.find((item: { Name: string; }) => {
        return item.Name == marketName
    })

    let result: Case = {
        name: jsonObject['Name'],
        "cost of case": jsonObject['Cost'],
        "cost of key": jsonObject['KeyCost'],
        "average return": market['Average']['Return'],
        "Average mill-spec": market['Average']['Milspec'],
        "Average restricted": market['Average']['Restricted'],
        "Average classified": market['Average']['Classified'],
        "Average covert": market['Average']['Covert'],
        "Average special": market['Average']['Special'],
        roi: market['Average']['ROI'],
        "skin values": [],
    };

    for (const id in market['Skins']){
        let _data = market['Skins'][id];
        let name = _data["Name"];
        let data = _data;
        let skin: Skin = {
            name: name,
            wears: data["wears"] as Wear[],
            prices: data["Price"],
            rarity: data["Rarity"] as Rarity
        };
        result["skin values"].push(skin);
    }
    return result;
}