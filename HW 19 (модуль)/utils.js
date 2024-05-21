export function jwtDecode(token) {
    if (!token || typeof token !== `string`) {
      return undefined;
    }
    const parts = token.split(`.`);
    if (parts.length !== 3) {
      return undefined;
    }
    const midlleParts = parts[1];

    try {
      const decodeMiddleParts = window.atob(midlleParts);

      const parse = JSON.parse(decodeMiddleParts);

      return parse;
    } catch (error) {
      return undefined;
    }
  }