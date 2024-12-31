

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send({ msg: 'Unauthorized' });

    jwt.verify(token, 'masai', (err, decoded) => {
        if (err) return res.status(403).send({ msg: 'Invalid token' });
        req.userID = decoded.userID;
        next();
    });
};

userRouter.get('/user', authenticate, async (req, res) => {
    try {
        const user = await UserModel.findById(req.userID);
        if (!user) return res.status(404).send({ msg: 'User not found' });
        res.send({ user });
    } catch (e) {
        res.status(500).send({ msg: 'Error fetching user', error: e.message });
    }
});
