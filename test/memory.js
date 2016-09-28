var SIZE = parseInt(process.argv[2] || 10000, 10)

require('../')({log: 'silent'})
  .error(console.log)
  .add('a:1', function (msg, done) {
    done(null, {x: msg.x})
  })
  .ready(function () {
    var start = Date.now()
    var count = 0

    for (var i = 0; i < SIZE; ++i) {
      this.act('a:1', {x: i}, function (ignore, out) {
        ++count

        if (SIZE === count) report(start)
      })
    }
  })

function report (start) {
  var end = Date.now()
  var mem = process.memoryUsage()
  console.log([
    SIZE,
    end - start,
    mem.rss,
    mem.heapTotal,
    mem.heapUsed
  ].join('\t'))
}

