export default class QueryUtil {
  static addQuery(currentQuery, key, value) {
    if (!currentQuery) {
      return { [key]: [value] };
    }
    if (!currentQuery[key]) {
      return Object.assign({}, currentQuery, { [key]: [value] });
    }

    return Object.assign({}, currentQuery, { [key]: [...currentQuery[key], value] });
  }
  static removeQueryByValue(currentQuery, key, value) {
    if (!currentQuery || !currentQuery[key]) {
      return currentQuery;
    }

    const queryValues = Array.isArray(currentQuery[key]) ? currentQuery[key] : [currentQuery[key]];

    if (!_.contains(queryValues, value)) {
      return currentQuery;
    }

    let newArray = _.reject(queryValues, (q) => {
      return q === value;
    });

    return Object.assign({}, currentQuery, { [key]: newArray });
  }
  static removeQuery(currentQuery, key) {
    if (!currentQuery || !currentQuery[key]) {
      return currentQuery;
    }

    let newQuery = {};

    _.each(currentQuery, (v, k) => {
      if (k === key) { return; }
      newQuery[k] = v;
    });

    return newQuery;
  }
  static replaceQuery(currentQuery, key, value) {
    if (!currentQuery) {
      return { [key]: [value] };
    }
    return Object.assign({}, currentQuery, { [key]: [value] });
  }
  static toString(query) {
    const items = [];
    _.each(query, (v, k) => {
      items.push(`${k}=${encodeURIComponent(v)}`);
    });
    return items.join('&');
  }
}