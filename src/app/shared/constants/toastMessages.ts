import { ToastModel } from 'src/app/core/models/toastModel';

export const EDIT_SUCCESS: ToastModel = {
  severity: 'success',
  summary: 'Create',
  detail: 'superhero edited with success!',
};

export const EDIT_ERROR: ToastModel = {
  severity: 'error',
  summary: 'Error',
  detail: 'error when edit the seuperhero!',
};

export const DELETE_SUCCESS: ToastModel = {
  severity: 'success',
  summary: 'Delete',
  detail: 'superhero delete with success!',
};

export const DELETE_ERROR: ToastModel = {
  severity: 'error',
  summary: 'Error',
  detail: 'error when delete the seuperhero!',
};

export const RECOVER_ERROR: ToastModel = {
  severity: 'error',
  summary: 'Error',
  detail: 'error when recover the seuperhero!',
};

export const CREATE_SUCCESS: ToastModel = {
  severity: 'success',
  summary: 'Create',
  detail: 'superhero created with success!',
};

export const CREATE_ERROR: ToastModel = {
  severity: 'error',
  summary: 'Error',
  detail: 'error when creating the seuperhero!',
};

export const SEARCHE_ERROR: ToastModel = {
  severity: 'error',
  summary: 'Error',
  detail: 'error when search the seuperheroes!',
};

export const INVALID_FORM: ToastModel = {
  severity: 'error',
  summary: 'Error',
  detail: 'Check all required fields',
};
