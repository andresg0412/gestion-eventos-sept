const connection = require('../domain/database');

describe('Database Connection', () => {
    let connection;

    beforeAll(async () => {
        connection = await getConnection();
    });

    afterAll(async () => {
        await connection.end();
    });

    it('should connect to the database', async () => {
        expect(connection).toBeDefined();
    });

    it('should create a new user', async () => {
        const result = await connection.execute(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            ['testUser', 'test@example.com', 'hashedPassword']
        );
        expect(result[0].affectedRows).toBe(1);
    });

    it('should get all users', async () => {
        const [users] = await connection.execute('SELECT * FROM users');
        expect(users.length).toBeGreaterThan(0);
    });

    it('should update a user', async () => {
        const [updatedUser] = await connection.execute(
            'UPDATE users SET email = ? WHERE id = ?',
            ['newemail@example.com', 1]
        );
        expect(updatedUser.affectedRows).toBe(1);
    });

    it('should delete a user', async () => {
        const [deletedUser] = await connection.execute(
            'DELETE FROM users WHERE id = ?',
            [1]
        );
        expect(deletedUser.affectedRows).toBe(1);
    });
});
