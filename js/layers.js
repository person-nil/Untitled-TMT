let p = {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.times(upgradeEffect("p", 13).plus(1))
        if (hasUpgrade("p", 21)) mult = mult.times(3)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(0.8)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Start Gaining Points",
            description: "Gain +2 points a second",
            cost: new Decimal(1),
            effect() {
                let gain = new Decimal(0)
                if (hasUpgrade("p", 11)) gain = gain.plus(2)
                if (hasUpgrade("p", 12)) gain = gain.times(5)
                return gain
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"/s"}
        },
        12: {
            title: "5x Points",
            description: "The first upgrade is now 5x as powerful",
            cost: new Decimal(3),
            unlocked() {
                let id = this.id
                let prev
                console.log(p.upgrades)
                Object.keys(p.upgrades).forEach(upg => {
                    if (upg==id) id = prev
                    prev = upg
                })
                if (hasUpgrade(this.layer, id)) return true; else return false
            },
        },
        13: {
            title: "Prestige Deflation",
            description: "Points now boost prestige [log10(P)^0.8]",
            effect() {
                if (hasUpgrade(this.layer, this.id)) return new Decimal(player.points).plus(1).log10().pow(0.8); else return new Decimal(0)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {
                let id = this.id
                let prev
                Object.keys(p.upgrades).forEach(upg => {
                    if (upg==id) id = prev
                    prev = upg
                })
                if (hasUpgrade(this.layer, id)) return true; else return false
            },
            cost: new Decimal(15),
        },
        14: {
            title: "Point Boost",
            description: "Points boost themselves [log20(P)]",
            effect() {
                if (hasUpgrade(this.layer, this.id)) return new Decimal(player.points).plus(1).log(20); else return new Decimal(0)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            cost: new Decimal(50),
            unlocked() {
                let id = this.id
                let prev
                Object.keys(p.upgrades).forEach(upg => {
                    if (upg==id) id = prev
                    prev = upg
                })
                if (hasUpgrade(this.layer, id)) return true; else return false
            },
        },
        21: {
            title: "Higher Numbers",
            description: "10x Points, 3x Prestige",
            cost: new Decimal(200),
            unlocked() {
                let id = this.id
                let prev
                Object.keys(p.upgrades).forEach(upg => {
                    if (upg==id) id = prev
                    prev = upg
                })
                if (hasUpgrade(this.layer, id)) return true; else return false
            },
        },
        22: {
            title: "Extra Layer",
            description: "Unlock Rebirth",
            cost: new Decimal(2500),
            unlocked() {
                let id = this.id
                let prev
                Object.keys(p.upgrades).forEach(upg => {
                    if (upg==id) id = prev
                    prev = upg
                })
                if (hasUpgrade(this.layer, id)) return true; else return false
            },
        },
    },
}
addLayer("p", p)