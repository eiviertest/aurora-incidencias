const notesCtrl = {};

// Models
const Note = require("../models/Note");

notesCtrl.renderNoteForm = (req, res) => {
  res.render("notes/new-note");
};

notesCtrl.createNewNote = async (req, res) => {
  const { title, nomP, nomGp, asunto, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Porfavor Seleccione un Tipo de Incidencia." });
  }
  if(!nomP){
    errors.push({ text: "Porfavor Seleccione un Tipo de Prioridad"});
  }
  if(!nomGp){
    errors.push({ text: "Porfavor Seleccione un Grupo"});
  }
  if(!asunto){
    errors.push({ text: "Porfavor Ingrese un Asunto"});
  }
  if (!description) {
    errors.push({ text: "Porfavor Ingrese una Descripción" });
  }
  if (errors.length > 0) {
    res.render("notes/new-note", {
      errors,
      title,
      nomP,
      nomGp,
      asunto,
      description
    });
  } else {
    const newNote = new Note({ title, nomP, nomGp, asunto, description });
    newNote.user = req.user.id;
    await newNote.save();
    req.flash("success_msg", "Incidencia Creada Correctamente");
    res.redirect("/notes");
  }
};

notesCtrl.renderNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).sort({ date: "desc" });
  res.render("notes/all-notes", { notes });
};

notesCtrl.renderEditForm = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note.user != req.user.id) {
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/notes");
  }
  res.render("notes/edit-note", { note });
};

notesCtrl.updateNote = async (req, res) => {
  const { title, nomP, nomGp, asunto, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, nomP, nomGp, asunto, description });
  req.flash("success_msg", "Incidencia Actualizada Correctamente");
  res.redirect("/notes");
};

notesCtrl.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Incidencia Eliminada Correctamente");
  res.redirect("/notes");
};

module.exports = notesCtrl;
