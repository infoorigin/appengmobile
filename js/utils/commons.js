

export function renderIf(condition, content) {
    if (condition) {
        return content;
    } else {
        return null;
    }
}