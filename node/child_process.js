const { exec, execFile, fork  } = require('child_process');
// child_process.exec(command[, options][, callback])
exec('node ./test.js', (error, stdout, stderr) => {
  if (error) {
    console.error('error:', error)
    return
  }
  console.log('stdout: ' + stdout)
  console.log('stderr: ' + stderr)
})

// child_process.execFile(file[, args][, options][, callback])
// 跟 .exec() 类似，不同点在于，没有创建一个新的 shell，options 参数与 exec 一样
execFile('node', ['./test.js'], (error, stdout, stderr) => {
  if (error) {
    console.error('error:', error)
    return
  }
  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr)
})

// child_process.fork(modulePath[, args][, options])
// 1、默认 silent 为 false，子进程会输出 output from the child3
fork('./dir/child3.js', {
  silent: false
});

// 2、设置 silent 为 true，则子进程不会输出
fork('./dir/child3.js', {
  silent: true
});

// 3、通过 stdout 属性，可以获取到子进程输出的内容
const child3 = fork('./dir/child3.js', {
  silent: true
})

child3.stdout.setEncoding('utf8')
child3.stdout.on('data', function (data) {
  console.log('stdout 中输出：')
  console.log(data)
})

// child_process.spawn(command[, args][, options])
// 在node中使用子进程运行脚本
const run = async (command: string, cwd: string = projectRoot) =>
  new Promise<void>((resolve, reject) => {
    const [cmd, ...args] = command.split(' ')
    consola.info(`run: ${chalk.green(`${cmd} ${args.join(' ')}`)}`)
    const app = spawn(cmd, args, {
      cwd,
      stdio: 'inherit', // 直接将这个子进程的输出共享给父进程
      shell: true, // 默认情况下 linux 才支持 rm -rf, 其他系统调用 git bash
    })

    const onProcessExit = () => app.kill('SIGHUP')

    app.on('close', (code) => {
      process.removeListener('exit', onProcessExit)
      if (code === 0) resolve()
      else
        reject(
          new Error(`Command failed. \n Command: ${command} \n Code: ${code}`)
        )
    })
    process.on('exit', onProcessExit)
  })



// 进程间通信
// 通过以上 4 种 API 创建子进程后，父进程与子进程之间将会创建 IPC（Inter-Process Communication）通道，通过 IPC 通道，父子进程之间通过 message 和 send 来通信。Node 中实现 IPC 通道的是管道（pipe）技术，具体实现细节由 libuv 实现，在 Windows 下由命名管道（named pipe）实现，*nix 系统则采用 Unix Domain Socket 实现
// 父进程
const child4 = fork('./dir/child4_1.js')

child4.on('message', (m)=>{
  console.log('message from child: ' + JSON.stringify(m))
})

child4.send({from: 'parent'})

// 子进程
process.on('message', function(m){
  console.log('message from parent: ' + JSON.stringify(m))
})

process.send({from: 'child'})
