import slugify from 'slugify';

export const generateSlug = async (text, Model, field = "slug") => {
  if (!text) return "";

  // base slug
  let baseSlug = slugify(text, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  }).substring(0, 100);

  let slug = baseSlug;
  let counter = 1;

  // check if slug already exists in DB
  let exists = await Model.findOne({ [field]: slug });
  while (exists) {
    slug = `${baseSlug}-${counter}`;
    counter++;
    exists = await Model.findOne({ [field]: slug });
  }

  return slug;
};