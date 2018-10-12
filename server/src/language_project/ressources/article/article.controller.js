import Joi from 'joi'
import Article from './article.model'

export default {
  async create(req, res){
    try{
      const schema = Joi.object().keys({//cree un obj et lui donne les keys du model
        title: Joi.string().required(),
        text: Joi.string().required(),
      });
      const { value, error } = Joi.validate(req.body, schema);
      if(error && error.details){
        return res.status(400).json(error);
      }
      const article = await Article.create(Object.assign({}, value))
      return res.json(article)
    } catch(err){
      console.log(err)
      return res.status(500).send(err)
    }
  },

  async delete(req, res){
    try {
      const { id } = req.params;
      const article = await Article.findByIdAndRemove(id)
      if (!article) {
        return res.status(404).json({err:'no article found'})
      }
      return res.json({err:'article removed'})
    } catch (err) {
      console.error(err)
      return res.status(500).send(err)
    }
  },

  async update(req, res){
    try {
      const { id } = req.params;
      const schema = Joi.object().keys({
        title: Joi.string().required(),
        text: Joi.string().required()
      })
      const { value, error } = Joi.validate(req.body, schema)
      if(error && error.details){
        return res.status(400).json(error)
      }

      const article = await Article.findOneAndUpdate({_id:id}, value, {new:true})
      if (!article) {
        return res.status(404).json({err:'no article found'})
      }
      return res.json(article)
    } catch (err) {
      return res.status(505).json(err)
    }
  },

  async articleList(req, res){
    try {
      const {page, perPage} = req.query;
      const options = {
        page:parseInt(page, 10) || 1,
        limit:parseInt(perPage, 10) || 10,
      }

      const article = await Article.paginate({}, options)
      res.json(article)
    } catch (err) {
        console.error(err)
        return res.status(500).send(err)
    }
  },

  async oneArticle(req, res){
    try {
      const { id } = req.params;
      const article = await Article.findById(id)
      if (!article) {
        return res.status(404).json({err:'no article found'})
      }
      return res.json(article)
    } catch (err) {
        console.error(err)
        return res.status(500).send(err)
    }
  },
}
