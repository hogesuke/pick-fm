export default class LocationUtil {
  static isProgramPage(location) {
    return /(^\/programs\/?$|^\/$|^$)/.test(location);
  }
  static isProgramEpisodePage(location) {
    return /^\/programs\/[0-9]+\/episodes\/[0-9]+/.test(location);
  }
  static isProgramEpisodesPage(location) {
    return /^\/programs\/[0-9]+\/episodes\/?$/.test(location);
  }
  static isGuestEpisodePage(location) {
    return /^\/guests\/[0-9]+\/episodes\/?$/.test(location);
  }
  static isSearchPage(location) {
    return /^\/search/.test(location);
  }
}