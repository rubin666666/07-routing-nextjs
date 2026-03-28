"use client";

import { Form, Formik, Field } from "formik";
import * as Yup from "yup";

import type { NoteTag } from "@/types/note";

import css from "./NoteForm.module.css";

const noteTags: NoteTag[] = ["Work", "Personal", "Meeting", "Shopping", "Todo"];

const noteSchema = Yup.object({
  title: Yup.string().trim().required("Title is required"),
  content: Yup.string().trim(),
  tag: Yup.string().oneOf(noteTags).required("Tag is required"),
});

interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

interface NoteFormProps {
  onSubmit?: (values: NoteFormValues) => void;
}

export default function NoteForm({ onSubmit }: NoteFormProps) {
  return (
    <Formik<NoteFormValues>
      initialValues={{
        title: "",
        content: "",
        tag: "Todo",
      }}
      validationSchema={noteSchema}
      onSubmit={(values, actions) => {
        onSubmit?.(values);
        actions.resetForm();
      }}
    >
      <Form className={css.form}>
        <label className={css.field}>
          <span className={css.label}>Title</span>
          <Field name="title" className={css.input} />
        </label>

        <label className={css.field}>
          <span className={css.label}>Content</span>
          <Field as="textarea" name="content" className={css.textarea} />
        </label>

        <label className={css.field}>
          <span className={css.label}>Tag</span>
          <Field as="select" name="tag" className={css.select}>
            {noteTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </Field>
        </label>

        <button type="submit" className={css.button}>
          Save note
        </button>
      </Form>
    </Formik>
  );
}
