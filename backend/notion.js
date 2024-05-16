const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const getNotionPageContent = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

const getNotionBlocks = async (blockId) => {
  const blocks = [];
  let cursor;
  while (true) {
    const { results, next_cursor } = await notion.blocks.children.list({
      start_cursor: cursor,
      block_id: blockId,
    });
    blocks.push(...results);
    if (!next_cursor) break;
    cursor = next_cursor;
  }
  return blocks;
};

module.exports = { getNotionPageContent, getNotionBlocks };
