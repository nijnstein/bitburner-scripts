/** @param {NS} ns **/
export async function main(ns) {

	var min_buy = 5; // remove hysterys while switching between long-short
	var bad_stock = -5;
	var min_money = 1000 * 1000 * 100; // smallest txn at 100M

	ns.print("Minimal txn amount = ", min_money);

	// make sure we can access api before proceeding 
	while (true) {
		if (ns.stock.purchase4SMarketDataTixApi()
			&&
			ns.stock.purchase4SMarketData()) {
			break;
		}
		await ns.sleep(1000);
	}

	var symbols = ns.stock.getSymbols();
	var maxshares = new Array(symbols.length);

	for (var i = 0; i < symbols.length; i++)
		maxshares[i] = ns.stock.getMaxShares(symbols[i]);

	while (true) {

		var fc = new Array(symbols.length);
		var ibest = -1;
		var position = new Array(symbols.length); // == long
		var shorted = new Array(symbols.length);
		var buying = true;

		while (buying) {
			buying = false;

			for (var i = 0; i < symbols.length; i++) {
				var pos = ns.stock.getPosition(symbols[i]);
				position[i] = pos[0];
				shorted[i] = pos[2];
				fc[i] = (ns.stock.getForecast(symbols[i]) * 100.0) - 50.0;
			}

			// get stock forecast and get the best we dont have all shares from 
			for (var i = 0; i < symbols.length; i++) {
				var f = fc[i];
				if (f < bad_stock) {
					if (shorted[i] > 0) ns.stock.sellShort(symbols[i], shorted[i]);
				}
				if (f > min_buy) {
					if (ibest < 0 || f > fc[ibest]) {
						if (position[i] < maxshares[i]) {
							ibest = i;
						}
					}
				}
			}

			// buy the best shares while we have money 
			if (ibest > 0) {
				var money = ns.getPlayer().money;
				if (money > min_money) { // dont buy for less then x unless there are less stock available
					if (ibest >= 0) {
						var max = maxshares[ibest];
						var pos = position[ibest];

						if (pos < max) {
							var n_buy = max - pos;

							var money_for_n = Math.floor(money / ns.stock.getAskPrice(symbols[ibest]));
							if (money_for_n > 0) {
								ns.stock.buy(symbols[ibest], Math.min(n_buy, money_for_n));
								buying = true;
							}
						}
					}
				}
			}

			await (ns.sleep(100));
		}

		// lose all shares with a bad forecast 
		for (var i = 0; i < symbols.length; i++) {
			if (fc[i] < 0 && position[i] > 0) {
				ns.stock.sell(symbols[i], position[i]);
			}
		}

		// reset positions 
		for (var i = 0; i < symbols.length; i++) {
			var pos = ns.stock.getPosition(symbols[i]);
			position[i] = pos[0];
			shorted = pos[2];
		}

		// short every bad stock (might have some money now from selling or bought everything viable)
		for (var i = 0; i < symbols.length; i++) {
			var money = ns.getPlayer().money;
			if (money < min_money) break;

			var f = fc[i];
			if (f < bad_stock) {
				if (shorted[i] < maxshares[i]) {
					var n_buy = maxshares[i] - shorted[i] - position[i];
					var money_for_n = Math.floor(money / ns.stock.getAskPrice(symbols[i]));

					if (money_for_n > 0) {
						ns.stock.buy(symbols[i], Math.min(n_buy, money_for_n));
						ns.stock.short(symbols[i], ns.stock.getPosition(symbols[i])[0]);
					}
				}
			}
		}
		await ns.sleep(1000);
	}
}
