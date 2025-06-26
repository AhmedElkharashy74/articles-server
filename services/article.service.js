const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const includeRelations = {
  tags: true,
  equations: true,
  attachments: true,
};

exports.createArticle = async ({
  title,
  content,
  summary,
  author,
  readTime,
  tags = '[]',
  equations = '[]',
  attachments = [],
}) => {
  try {
    const parsedTags = parseJsonArray(tags);
    const parsedEquations = parseJsonArray(equations);

    return await db.article.create({
      data: {
        title,
        content,
        summary,
        author,
        readTime,
        tags: { connectOrCreate: buildTagData(parsedTags) },
        equations: { create: buildEquationData(parsedEquations) },
        attachments: { create: buildAttachmentData(attachments) },
      },
      include: includeRelations,
    });
  } catch (err) {
    console.error('Create Article Error:', err);
    throw new Error('Failed to create article');
  }
};


exports.getArticles = async (articleNum, page) => {
  if (!Number.isInteger(articleNum) || !Number.isInteger(page)) {
    throw new Error('Invalid input: articleNum and page must be integers');
  }

  try {
    return await db.article.findMany({
      skip: (page - 1) * articleNum,
      take: articleNum,
      include: includeRelations,
    });
  } catch (err) {
    console.error('Get Articles Error:', err);
    throw new Error('Failed to retrieve articles');
  }
};

exports.getArticleById = async (id) => {
  try {
    return await db.article.findUnique({
      where: { id },
      include: includeRelations,
    });
  } catch (err) {
    console.error('Get Article by ID Error:', err);
    throw new Error('Failed to retrieve article');
  }
};

exports.updateArticle = async (
  id,
  {
    title,
    content,
    summary,
    author,
    readTime,
    tags = '[]',
    equations = '[]',
    attachments = [],
  }
) => {
  try {
    const parsedTags = parseJsonArray(tags);
    const parsedEquations = parseJsonArray(equations);

    return await db.$transaction(async (tx) => {
      await tx.equation.deleteMany({ where: { articleId: id } });
      await tx.attachment.deleteMany({ where: { articleId: id } });

      return await tx.article.update({
        where: { id },
        data: {
          title,
          content,
          summary,
          author,
          readTime,
          tags: {
            set: [],
            connectOrCreate: buildTagData(parsedTags),
          },
          equations: {
            create: buildEquationData(parsedEquations),
          },
          attachments: {
            create: buildAttachmentData(attachments),
          },
        },
        include: includeRelations,
      });
    });
  } catch (err) {
    console.error('Update Article Error:', err);
    throw new Error('Failed to update article');
  }
};

exports.deleteArticle = async (id) => {
  try {
    return await db.$transaction(async (tx) => {
      await tx.equation.deleteMany({ where: { articleId: id } });
      await tx.attachment.deleteMany({ where: { articleId: id } });
      return await tx.article.delete({ where: { id } });
    });
  } catch (err) {
    console.error('Delete Article Error:', err);
    throw new Error('Failed to delete article');
  }
};