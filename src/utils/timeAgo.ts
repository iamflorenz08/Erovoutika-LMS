import moment from "moment";

export default (date: Date): string => {
    const now = moment();
    const pastDate = moment(date);
    return pastDate.from(now);
}