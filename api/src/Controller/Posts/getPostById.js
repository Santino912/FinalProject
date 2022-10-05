const { Posts, Genres, Users } = require('../../db.js');

const getPostById = async (req, res) => {

    const { id } = req.params;

    try {

        const post = await Posts.findByPk(id, {
            include: [{
                model: Genres,
                attributes: ['name'],
                through: { attributes: [] }
            },
            {
                model: Users
            }]
        });

        return res.json(post);

    } catch (error) {

        return res.status(500).send(error);
    };
};

module.exports = getPostById;