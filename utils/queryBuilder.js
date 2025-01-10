class QueryBuilder {
  constructor(query, queryParams) {
    this.query = query;
    this.queryParams = queryParams;
  }

  filter() {
    const filterableFields = ["categoryId", "shopId"];
    let filters = {};

    filterableFields.forEach((field) => {
      if (this.queryParams[field]) filters[field] = this.queryParams[field];
    });

    if (this.queryParams.minPrice || this.queryParams.maxPrice) {
      filters.price = {};
      if (this.queryParams.minPrice)
        filters.price.$gte = parseFloat(this.queryParams.minPrice);
      if (this.queryParams.maxPrice)
        filters.price.$gte = parseFloat(this.queryParams.maxPrice);
    }

    if (this.queryParams.search) {
      filters.name = { $regex: this.queryParams.search, $options: "i" };
    }

    this.query = this.query.find(filters);
    return this;
  }

  sort() {
    const sortFields = {
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      name_asc: { name: 1 },
      name_desc: { name: -1 },
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
    };

    if (this.queryParams.sort) {
      this.query = this.query.sort(
        sortFields[this.queryParams.sort] || { createdAt: -1 }
      );
    }
    return this;
  }

  paginate() {
    const page = parseInt(this.queryParams.page, 10) || 1;
    const limit = parseInt(this.queryParams.limit, 10) || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = QueryBuilder;
