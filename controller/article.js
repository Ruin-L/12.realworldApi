/*
 * @Description: {{ByRuin}}
 * @Version: 2.0
 * @Author: Ruin 🍭
 * @Date: 2022-02-21 14:15:35
 * @LastEditors: 刘引
 * @LastEditTime: 2022-02-24 22:02:17
 */
import { modelData } from "../model/index.js";
import jwt from "../util/jwt.js";
import { URL } from "../config/config.default.js";
import mongoose from "mongoose";

// 获取文章列表
const getArticles = async (req, res, next) => {
  try {
    const { limit = 20, offset = 0, tag, author } = req.query;
    const filter = {};
    // 根据文章标签来筛选
    if (tag) {
      filter.tagList = tag;
    }
    // 根据文章作者来筛选
    if (author) {
      const user = await modelData.User.findOne({ username: author });
      // const id = mongoose.Types.ObjectId(user._id).toString();
      filter.author = user ? user._id : null;
      console.log(filter.author);
    }

    const articles = await modelData.Article.find(filter)
      .skip(Number.parseInt(offset)) //跳过多少条
      .limit(Number.parseInt(limit))
      .sort({
        // -1代表倒叙 1代表升序
        createAt: -1,
      }); //取多少条
    // 获取文章数量
    const articlesCount = await modelData.Article.countDocuments();
    res.status(200).json({ articles, articlesCount });
  } catch (error) {
    next(error);
  }
};

// 获取用户关注和作者的文章列表
const getFeedArticles = async (req, res, next) => {
  try {
    res.status(200).json("成功");
  } catch (error) {
    res.status(500).json("失败");
  }
};

// 获取文章
const getArticle = async (req, res, next) => {
  try {
    const article = await modelData.Article.findById(
      req.params.articleId
    ).populate("author");
    // console.log("文章", article);
    if (!article) {
      return res.status(404).end("文章不存在");
    }
    res.status(200).json({ article });
  } catch (error) {
    res.status(500).json("失败");
  }
};

// 创建文章
const createArticle = async (req, res, next) => {
  try {
    // 处理请求
    const article = new modelData.Article(req.body.article);
    article.author = req.user._id;
    // 将作者的信息返还给客户端
    article.populate("author");
    await article.save();
    res.status(201).json({
      article,
    });
  } catch (error) {
    res.status(500).json("创建失败");
  }
};

// 更新文章
const updateArticle = async (req, res, next) => {
  try {
    res.status(200).json("成功");
  } catch (error) {
    res.status(500).json("失败");
  }
};

// 删除文章
const deleteArticle = async (req, res, next) => {
  try {
    res.status(200).json("成功");
  } catch (error) {
    res.status(500).json("失败");
  }
};

// 添加文章评论
const createArticleComment = async (req, res, next) => {
  try {
    res.status(200).json("成功");
  } catch (error) {
    res.status(500).json("失败");
  }
};

// 获取文章评论列表
const getArticleComment = async (req, res, next) => {
  try {
    res.status(200).json("成功");
  } catch (error) {
    res.status(500).json("失败");
  }
};

// 删除文章评论
const deleteArticleComment = async (req, res, next) => {
  try {
    res.status(200).json("成功");
  } catch (error) {
    res.status(500).json("失败");
  }
};

// 文章点赞

export default {
  getArticles,
  getFeedArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  createArticleComment,
  getArticleComment,
  deleteArticleComment,
};
