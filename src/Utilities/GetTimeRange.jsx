export default function GetTimeRange() {
    const now = new Date();
    const formatterNow = now.toISOString().split("T")[0];
    const oneWeek = new Date(+now - 1000 * 60 * 60 * 24 * 7);
    const formatterOneWeek = oneWeek.toISOString().split("T")[0];
    // console.log(formatterNow, formatterOneWeek);
    return `${formatterOneWeek},${formatterNow}`;
}
