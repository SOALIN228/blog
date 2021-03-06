const xss = require('xss')
const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 ` // 1=1 做保底操作，代码更健壮
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc`

  return exec(sql)
}

const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}'`
  return exec(sql).then(rows => {
    return rows[0]
  })
}

const newBlog = (blogData = {}) => {
  const title = xss(blogData.title)
  const content = blogData.content
  const author = blogData.author
  const createTime = Date.now()
  const sql = `
    insert into blogs (title, content, createtime, author) 
    value ('${title}', '${content}', ${createTime}, '${author}')
  `
  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
}

const updateBlog = (id, blogData = {}) => {
  const title = blogData.title
  const content = blogData.content
  const sql = `
    update blogs set title='${title}', content='${content}' where id='${id}'
  `
  return exec(sql).then(updateData => {
    return updateData.affectedRows > 0;
  })
}

const delBlog = (id, author) => {
  const sql = `delete from blogs where id='${id}' and author='${author}'`
  return exec(sql).then(delData => {
    return delData.affectedRows > 0;
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
