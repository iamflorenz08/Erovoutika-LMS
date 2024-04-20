import moment from "moment";
export const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
        month: 'short', // Short month name: Dec
        day: '2-digit', // Two-digit day: 17
        year: 'numeric' // Full year: 2023
    })
}

export const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
}

export const timeAgo = (date: Date): string => {
    const now = moment();
    const pastDate = moment(date);
    return pastDate.from(now);
}