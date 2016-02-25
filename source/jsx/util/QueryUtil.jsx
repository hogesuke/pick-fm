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
  static removeQuery(currentQuery, key, value) {
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
}