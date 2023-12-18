const sortByDate = (data, ascending = false) => {
    const sortOrder = ascending ? 1 : -1;

    return data.sort(({ createdAt: a }, { createdAt: b }) => {
        if (a < b) return -1 * sortOrder;
        if (a > b) return 1 * sortOrder;
        return 0;
    });
};

export default sortByDate;
