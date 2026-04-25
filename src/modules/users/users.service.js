// Тут ВСЯ бізнес-логіка — правила, перевірки, трансформації
// Service не знає про req/res, тільки про дані

export const UsersService = {
  async getAll() {
    // тут буде звернення до БД (наприклад через Prisma/Mongoose)
    return [{ id: 1, name: 'Bohdan' }]
  },

  async getById(id) {
    // знаходимо одного юзера
    return { id, name: 'Bohdan' }
  },

  async create(data) {
    // перевірки, хешування пароля, збереження
    return { id: Date.now(), ...data }
  },
}
