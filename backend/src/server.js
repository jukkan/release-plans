import app from './app.js';
import dotenv from 'dotenv';
import { testConnection } from './config/database.js';

dotenv.config();

const PORT = process.env.PORT || 3001;

// Test database connection before starting server
testConnection().then((connected) => {
  if (!connected) {
    console.error('⚠️  Server starting without database connection');
  }
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  });
});
