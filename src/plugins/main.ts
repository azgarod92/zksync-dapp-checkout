import Vue from "vue";
import utils from "@/plugins/utils";

import { GweiBalance, TokenSymbol } from "@/types/index";

// @ts-ignore
import { BigNumber } from "ethers";

// @ts-ignore
import Popover from "vue-js-popover";

// @ts-ignore
import VueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"

Vue.use(Popover);
Vue.component('VueCustomScrollbar', VueCustomScrollbar);

/**
 * Implementation of the tokenFormatter as a global filter
 */
Vue.filter("formatToken", (value: GweiBalance | BigNumber, symbol: TokenSymbol) => {
  return utils.handleFormatToken(symbol, <string>value);
});
Vue.filter("formatTokenPretty", (value: GweiBalance | BigNumber, symbol: TokenSymbol) => {
  return utils.handleFormatTokenPretty(symbol, <string>value);
});

/**
 * Implementation of the tokenFormatter as a global filter
 */
Vue.filter("formatUsdAmount", (value: string | BigNumber, price: string, symbol: TokenSymbol) => {
  return utils.getFormattedTotalPrice(Number(price), +utils.handleFormatToken(symbol, value.toString()));
});

/**
 * Filtering human-readable time
 */
Vue.filter("getTimeString", (value: number) => {
  const { hours, minutes, seconds } = utils.timeCalc(value);
  return `${hours ? utils.handleTimeAmount(hours, "hour") : ""}
              ${minutes ? utils.handleTimeAmount(minutes, "minute") : ""}
              ${seconds ? utils.handleTimeAmount(seconds, "second") : ""}`;
});
