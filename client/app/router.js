import { AboutController } from "./controllers/AboutController.js";
import { CommentsController } from "./controllers/CommentsController.js";
import { HomeController } from "./controllers/HomeController.js";
import { LikesController } from "./controllers/LikesController.js";
import { PostsController } from "./controllers/PostsController.js";
import { QuestionsController } from "./controllers/QuestionsController.js";
import { SpellsController } from "./controllers/SpellsController.js";
import { ValuesController } from "./controllers/ValuesController.js";
import { WizardsController } from "./controllers/WizardsController.js";
import { AboutView } from "./views/AboutView.js";

/**
 * Register your routes for the application here
 * @type {Route[]}
 */
export const router = [
  {
    path: '',
    controller: [PostsController, LikesController, CommentsController],
    // @ts-ignore
    view: null
  },
  {
    path: '#/about',
    controller: [AboutController, ValuesController],
    view: AboutView
  },
  // {
  //   path: '#/wizards',
  //   controller: WizardsController,
  //   // @ts-ignore
  //   view: null
  // },
  // {
  //   path: '#/spells',
  //   controller: SpellsController,
  //   // @ts-ignore
  //   view: null
  // },
  // {
  //   path: '/#questions',
  //   controller: QuestionsController,
  //   // @ts-ignore
  //   view: null
  // }
]






/**
 * Supporting types for the router
 * NOTE Controllers must be non instantiated 
 * @typedef {{[x:string]:any}} controller
 * @typedef {{path: string, controller?:controller |controller[], view?: string, target?: string}} Route
 */