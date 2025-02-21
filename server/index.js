import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { createClient } from '@libsql/client';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const db = createClient({
  url: 'file:editor.db',
});

// Create tables
await db.execute(`
  CREATE TABLE IF NOT EXISTS rooms (
    id TEXT PRIMARY KEY,
    code TEXT DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_id TEXT,
    user_name TEXT,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms(id)
  );
`);

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', async ({ roomId, userName }) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-joined', { userName, socketId: socket.id });
    
    // Get or create room
    await db.execute({
      sql: 'INSERT OR IGNORE INTO rooms (id) VALUES (?)',
      args: [roomId]
    });
    
    // Get room code
    const room = await db.execute({
      sql: 'SELECT code FROM rooms WHERE id = ?',
      args: [roomId]
    });
    socket.emit('sync-code', { code: room.rows[0]?.code || '' });
    
    // Get previous messages
    const messages = await db.execute({
      sql: 'SELECT * FROM messages WHERE room_id = ? ORDER BY created_at DESC LIMIT 50',
      args: [roomId]
    });
    socket.emit('sync-messages', { messages: messages.rows.reverse() });
  });

  socket.on('code-change', async ({ roomId, code }) => {
    await db.execute({
      sql: 'UPDATE rooms SET code = ? WHERE id = ?',
      args: [code, roomId]
    });
    socket.to(roomId).emit('code-change', { code });
  });

  socket.on('send-message', async ({ roomId, userName, content }) => {
    const result = await db.execute({
      sql: 'INSERT INTO messages (room_id, user_name, content) VALUES (?, ?, ?)',
      args: [roomId, userName, content]
    });
    
    const message = {
      id: result.lastInsertRowid,
      room_id: roomId,
      user_name: userName,
      content,
      created_at: new Date().toISOString()
    };
    io.to(roomId).emit('receive-message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});