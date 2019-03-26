const auth = (req, res, next) => {
  let token = {
    name: 'Rick',
    cool: true
  }

  res.send({ data: token })
}

module.exports = auth