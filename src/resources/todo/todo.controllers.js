import { Todo } from "./todo.model";

const getIndex = async (req, res) => {
  let results = {};
  try {
    let filter = {};
    if (req.query.status) {
      filter = { status: req.query.status };
    }
    if (req.query.upcomming) {
      filter = { dueDate: { $gte: new Date() } };
    }
    results = await Todo.find(filter).lean().exec();
  } catch (e) {
    console.error(e);
  } finally {
    if (req.query.isAjax) {
      return res.render("index", { results, layout: "" });
    }
    return res.render("index", { results });
  }
};

const getCreateTodo = (req, res) => {
  res.render("createupdate", { title: "Create Todo" });
};

const postCreateTodo = async (req, res, next) => {
  try {
    const postData = req.body;
    await new Todo({
      name: postData.name,
      description: postData.description,
      dueDate: new Date(postData.dueDate),
      priority: postData.priority,
      status: postData.status,
    }).save();
    res.redirect("/");
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const getUpdateTodo = async (req, res) => {
  const result = await Todo.findById(req.params.id).lean().exec();
  res.render("createupdate", { title: "Update Todo", ...result });
};

const putUpdateTodo = async (req, res, next) => {
  try {
    const data = req.body;
    await Todo.findByIdAndUpdate(req.params.id, {
      name: data.name,
      description: data.description,
      dueDate: new Date(data.dueDate),
      priority: data.priority,
      status: data.status,
    });
    res.redirect("/");
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
  } catch (e) {
    console.log(e);
    next(e);
  } finally {
    res.redirect("/");
  }
};

export {
  getIndex,
  getCreateTodo,
  postCreateTodo,
  getUpdateTodo,
  putUpdateTodo,
  deleteTodo,
};
