export const handleCreatedUpdatedBy = (req, res, next) => {
  const oldJson = res.json;

  res.json = function (data) {
    if (!data?.data) {
      return oldJson.call(this, data);
    }


    if (req.user?.role === "user") {
      if (Array.isArray(data.data)) {
        data.data = data.data.map(doc => {
          const obj = doc.toObject ? doc.toObject() : { ...doc };
          delete obj.createdBy;
          delete obj.updatedBy;
          return obj;
        });
      } else {
        const obj = data.data.toObject ? data.data.toObject() : { ...data.data };
        delete obj.createdBy;
        delete obj.updatedBy;
        data.data = obj;
      }
    }

    return oldJson.call(this, data);
  };

  next();
};
