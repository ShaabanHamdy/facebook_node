import { config } from 'dotenv';
import express from 'express';
import App from './src/utils/App.js';
// ========================= App init ==========================================

config({ path: "./secret.env" })
App(express)

