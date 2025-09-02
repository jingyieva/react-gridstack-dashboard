export function isoDayOfWeek(dt) {
    let wd = dt.getDay(); // 0..6, from sunday
    wd = (wd + 6) % 7 + 1; // 1..7 from monday
    return '' + wd; // string so it gets parsed
}

export function startOfToday() {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
}

export function generateTimesMatrixData(y) {
    const data = [];
    const end = startOfToday();
    let dt = new Date(new Date().setDate(end.getDate() - 365));
    while (dt <= end) {
      const iso = dt.toISOString().substr(0, 10);
      data.push({
        x: iso,
        y: isoDayOfWeek(dt),
        d: iso,
        v: Math.random() * 50
      });
      dt = new Date(dt.setDate(dt.getDate() + 1));
    }
    return data;
}

export const generateTs = (end = new Date(), days = 20) => {  //timestamp 10 digit
    const data = [];
    // 起點 = end 往前 days 天
    let dt = new Date(new Date().setDate(end.getDate() - days + 1));
    while (dt <= end) {
      const iso = dt.toISOString().split("T")[0];
      data.push(iso);

      dt = new Date(dt.setDate(dt.getDate() + 1));
    }
    return data;

}