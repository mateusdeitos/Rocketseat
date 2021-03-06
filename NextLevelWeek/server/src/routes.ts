import express, { response } from "express";
import PointsController from "./controllers/pointsController";
import ItemsController from "./controllers/itemsController";
import multer from 'multer';
import multerConfig from '../src/config/multer';
import { celebrate, Joi } from "celebrate";

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);
routes.get('/points', pointsController.index);
routes.get('/ufs', pointsController.showUfs);
routes.get('/points/:id', pointsController.show);
routes.get('/points/cities/:uf', pointsController.showCities);
routes.post('/points',
    upload.single('image'),
    celebrate(
        {
            body: Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string().required().email(),
                whatsapp: Joi.number().required(),
                latitude: Joi.number().required(),
                longitude: Joi.number().required(),
                city: Joi.string().required(),
                uf: Joi.string().required().max(2),
                items: Joi.string().required(),
                
            })
        },
        // => Para validar todos os campos e retornar todos erros, se for true, retorna o primeiro campo que a validação falhou
        { abortEarly: false } 
    ),
    pointsController.create);

export default routes; 