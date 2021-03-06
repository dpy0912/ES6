# HTTP HTTPS

## HTTP

超文本传输协议(`Hyper Text Transfer Protocol`，HTTP)，是一个简单的请求响应协议，它通常运行在TCP之上，它指定了客户端可以发送给服务器什么样的消息以及得到什么样的响应，请求和响应的消息头是以`ASCII`形式给出的，而消息内容则是有一个类似MIME的格式。

发展历程：

1991年HTTP/0.9出现，1996年HTTP/1.0出现，1999年HTTP/1.1出现，2015年HTTP/2出现。

### GET和POST区别

- 最直观的区别就是`GET`把参数放在`URL`中，而`POST`把参数放在`request body`传递参数。
- `GET`浏览器回退是无害的，而`POST`会再次提交请求。
- `GET`会被浏览器主动缓存，而`POST`不会。
- `GET`请求只能对`URL`进行编码，而`POST`支持多种编码格式。
- `GET`请求的`URL`中传输的长度是有限的，而`POST`没有。
- 对参数类型而言，`GET`只支持`ASCII`，而`POST`没有限制。
- `GET`比`POST`更不安全，因为参数直接暴露在`URL`上，所以不能用来传递敏感信息。

#### 本质区别

`HTTP`本质是`TCP/IP`，而`GET`和`POST`本质底层也是`TCP/IP`，也就是说，`GET`和`POST`都是`TCP`链接，它们所完成的功能都是一样的，你要给`GET`加上`request body`这个基于原理也是可以实现的。

## HTTP的基本优化

影响一个`HTTP`请求和响应的因素主要有两个：**带宽**和**延迟**。

- `带宽`：如果说我们还停留在拨号上网的阶段，带宽可能是影响网络请求的一个比较严重的问题，但是现在网络基础设施以及得到极大的提升，我们不在担心由带宽影响网速。
- `延迟`：
  - 浏览器阻塞：浏览器会因为一些原因阻塞请求，浏览器对同一域名，同时只能有四个连接，超过浏览器最大连接数量限制，后续的请求就会被阻塞。
  - DNS查询：浏览器需要知道目标服务器的IP才能建立连接，将域名解析为IP的这个系统就是DNS，这个可以使用DNS缓存结果来达减少这个结果的水时间。
  - 建立连接：HTTP是建立在TCP连接之上的，浏览器最快也要三次握手才可以携带HTTP请求报文，达到真正的建立连接，但是这些连接是无法复用的，导致每次都需要建立三次握手和慢启动，三次握手和高延迟场景下影响比较明显，慢启动对大文件请求影响较大。

## HTTP/1.0

HTTP1.0最早在网页中使用是在1996年，那个时候只是使用一些较为简单的网页上和网络请求上，为了提高系统的效率，HTTP 1.0规定浏览器与服务器只保持短暂的连接，浏览器的每次请求都需要与服务器建立一个TCP连接，服务器完成请求处理后立即断开TCP连接，服务器不跟踪每个客户也不记录过去的请求。但是，这也造成了一些性能上的缺陷，例如，一个包含有许多图像的网页文件中并没有包含真正的图像数据内容，而只是指明了这些图像的URL地址，当WEB浏览器访问这个网页文件时，浏览器首先要发出针对该网页文件的请求，当浏览器解析WEB服务器返回的该网页文档中的HTML内容时，发现其中的图像标签后，浏览器将根据标签中的src属性所指定的URL地址再次向服务器发出下载图像数据的请求。显 然，访问一个包含有许多图像的网页文件的整个过程包含了多次请求和响应，每次请求和响应都需要建立一个单独的连接，每次连接只是传输一个文档和图像，上一次和下一次请求完全分离。即使图像文件都很小，但是客户端和服务器端每次建立和关闭连接却是一个相对比较费时的过程，并且会严重影响客户机和服务器的性能。当一个网页文件中包含JavaScript文件，CSS文件等内容时，也会出现类似上述的情况。

同时，带宽和延迟也是影响一个网络请求的重要因素。在网络基础建设已经使得带宽得到极大的提升的当下，大部分时候都是延迟在于响应速度。基于此会发现，http1.0被抱怨最多的就是连接无法复用，和head of line blocking这两个问题。理解这两个问题有一个十分重要的前提：客户端是依据域名来向服务器建立连接，一般PC端浏览器会针对单个域名的server同时建立6～8个连接，手机端的连接数则一般控制在4～6个。显然连接数并不是越多越好，资源开销和整体延迟都会随之增大。连接无法复用会导致每次请求都经历三次握手和慢启动。三次握手在高延迟的场景下影响较明显，慢启动则对文件类大请求影响较大。head of line blocking会导致带宽无法被充分利用，以及后续健康请求被阻塞。
HTTP队头阻塞

### HTTP队头阻塞

HTTP1.1添加了管线化技术，允许客户端不用等到服务器响应就可以发送下一次请求，目的为了再一次TCP连接上可以并发多个请求，来提高网络利用率，但是它存在一个缺点，那就是服务器必须按照请求的顺序来响应，即后续的请求响应必须等到第一个响应发送之后才能发送，即使后面响应已经完成，这就是HTTP队头阻塞。

#### 如何解决队头阻塞

##### 并发连接

对于一个域名允许多个长连接，那么相当于增加了任务队列，不至于一个队伍的任务阻塞其他所在任务，在`RFC2616`规定过客户端最多并发两个连接，不过事实上现在的浏览器标准中，这个上限要多得多，`Chrome`浏览器就有6个，事实上，提高了并发已不能满足用户对性能的需求。

##### 域名分片

一个域名可以并发6个长连接，那么就多分几个域名，比如 www.bugdr.cn 、mp.bugdr.cn，这样一个域名可以分为非常多的二级域名，而且它们都同时指向一台服务器，能够并发的长连接数就更多了，事实上也能更好的解决队头阻塞的问题。

##### 使用HTTP2.0

对于`HTTP1.1`中管线化请求技术导致的队头阻塞，可以使用HTTP2.0解决，HTTP2.0添加了一层二进制分帧层，引入了帧，消息，流的概念，每个请求/响应应为消息，消息可以分为多帧，每个帧在流中传输，一个TCP连接可以有多个流，各个帧在达到后重组为消息，这样就避免了请求队头阻塞。

当然，HTTP2.0的底层还是使用TCP协议，仍会出现队头阻塞。

## HTTP/1.1

为了克服`HTTP1.0`这个缺陷，HTTP1.1支持持久连接，在一个TCP上可以传输多个HTTP请求和响应，减少了建立连接和关闭连接的消耗和延迟，一个包含有许多图像的网页文件的多个请求和应答可以在一个连接中传输，但每个单独的网页文件的请求和应答仍然需要使用各自的连接。HTTP 1.1还允许客户端不用等待上一次请求结果返回，就可以发出下一次请求，但服务器端必须按照接收到客户端请求的先后顺序依次回送响应结果，以保证客户端能够区分出每次请求的响应内容，这样也显著地减少了整个下载过程所需要的时间。

在http1.1，request和reponse头中都有可能出现一个connection的头，此header的含义是当client和server通信时对于长链接如何进行处理。
在http1.1中，client和server都是默认对方支持长链接的， 如果client使用http1.1协议，但又不希望使用长链接，则需要在header中指明connection的值为close；如果server方也不想支持长链接，则在response中也需要明确说明connection的值为close。不论request还是response的header中包含了值为close的connection，都表明当前正在使用的tcp链接在当天请求处理完毕后会被断掉。以后client再进行新的请求时就必须创建新的tcp链接了。

HTTP 1.1在继承了HTTP 1.0优点的基础上，也克服了HTTP 1.0的性能问题。HTTP 1.1通过增加更多的请求头和响应头来改进和扩充HTTP 1.0的功能。如，HTTP 1.0不支持Host请求头字段，WEB浏览器无法使用主机头名来明确表示要访问服务器上的哪个WEB站点，这样就无法使用WEB服务器在同一个IP地址和端口号上配置多个虚拟WEB站点。在HTTP 1.1中增加Host请求头字段后，WEB浏览器可以使用主机头名来明确表示要访问服务器上的哪个WEB站点，这才实现了在一台WEB服务器上可以在同一个IP地址和端口号上使用不同的主机名来创建多个虚拟WEB站点。HTTP 1.1的持续连接，也需要增加新的请求头来帮助实现，例如，Connection请求头的值为Keep-Alive时，客户端通知服务器返回本次请求结果后保持连接；Connection请求头的值为close时，客户端通知服务器返回本次请求结果后关闭连接。HTTP 1.1还提供了与身份认证、状态管理和Cache缓存等机制相关的请求头和响应头。HTTP/1.0不支持文件断点续传，RANGE:bytes是HTTP/1.1新增内容，HTTP/1.0每次传送文件都是从文件头开始，即0字节处开始。RANGE:bytes=XXXX表示要求服务器从文件XXXX字节处开始传送，这就是我们平时所说的断点续传

HTTP1.0和HTTP1.1主要区别主要体现在：

- 缓存处理：在HTTP1.0中主要使用header里的If-Modified-Since,Expires来做为缓存判断的标准，HTTP1.1则引入了更多的缓存控制策略例如Entity tag，If-Unmodified-Since, If-Match, If-None-Match等更多可供选择的缓存头来控制缓存策略。
- 带宽优化及网络连接的使用：HTTP1.0中，存在一些浪费带宽的现象，例如客户端只是需要某个对象的一部分，而服务器却将整个对象送过来了，并且不支持断点续传功能，HTTP1.1则在请求头引入了range头域，它允许只请求资源的某个部分，即返回码是206（Partial Content），这样就方便了开发者自由的选择以便于充分利用带宽和连接。
- 错误通知的管理：在HTTP1.1中新增了24个错误状态响应码，如409（Conflict）表示请求的资源与资源的当前状态发生冲突；410（Gone）表示服务器上的某个资源被永久性的删除。
- Host头处理：在HTTP1.0中认为每台服务器都绑定一个唯一的IP地址，因此，请求消息中的URL并没有传递主机名（hostname）。但随着虚拟主机技术的发展，在一台物理服务器上可以存在多个虚拟主机（Multi-homed Web Servers），并且它们共享一个IP地址。HTTP1.1的请求消息和响应消息都应支持Host头域，且请求消息中如果没有Host头域会报告一个错误（400 Bad Request）。
- 长连接：HTTP 1.1支持长连接（PersistentConnection）和请求的流水线（Pipelining）处理，在一个TCP连接上可以传送多个HTTP请求和响应，减少了建立和关闭连接的消耗和延迟，在HTTP1.1中默认开启Connection： keep-alive，一定程度上弥补了HTTP1.0每次请求都要创建连接的缺点。

## HTTP/2.0

HTTP2.0是HTTP协议自1999年HTTP1.1发布后的首个更新，主要基于SPDY协议。HTTP2.0大幅度的提高了web性能，在HTTP1.1完全语义兼容的基础上，进一步减少了网络的延迟。实现低延迟高吞吐量。对于前端开发者而言，减少了优化工作。主要体现在以下几点特性：

- 头部压缩
- 多路复用
- 二进制分帧
- 请求优先级
- 服务器推送

### SPDY协议

`SPDY`是Speedy的昵音，意为“更快”。它是Google开发的基于TCP协议的应用层协议。目标是优化HTTP协议的性能，通过压缩、多路复用和优先级等技术，缩短网页的加载时间并提高安全性。SPDY协议的核心思想是尽量减少TCP连接数。SPDY并不是一种用于替代HTTP的协议，而是对HTTP协议的增强。

### 头部压缩

在HTTP1.1之前的时代，请求体一般会有响应和压缩编码的过程，通过`Conetent-Encoding`头部字段来指定，但是你有没有想过头部字段本身的压缩，当请求字段非常复杂的时候，尤其是`GET`请求，请求报文几乎全是请求头，这个时候还存在非常大的优化空间，HTTP2针对头部字段也采用了对应的压缩算法--HPACK对请求头进行压缩。

HPACK算法是专门针对HTTP2设计的，它主要的亮点有两个：

- 首先在服务器和客户端之间建立哈希表，将用到的字段存在这个表中，那么在传输的时候对于之前出现过的值，只需要把索引传给对方，对方拿到索引查表就可以，这种传索引的方式，可以说让请求头字段得到极大程度的精简和复用。
- 其次是对于整数和字符串进行哈夫曼编码，哈夫曼编码的原理就是先将所有出现的字符建立一张索引表，然后让出现次数多的字符对应的索引尽可能短，传输的时候也是传输这样的索引序列，可以达到非常高的压缩率。


### 多路复用

之前说的`HTTP`队头阻塞问题可以使用**并发连接**和**域名分片**来进行优化，但是这个并没有从根本上解决这个问题，只是添加了`TCP`连接，多条`TCP`连接会竞争`有限的带宽`，让真正优先级高的不能请求。

在`HTTP1.1`中我们经常使用到雪碧图、使用多个域名等方式来进行优化，都是因为浏览器限制了同一个域名的请求数量，当页面需要请求很多资源的时候，队头阻塞会导致达到最大请求时，资源需要等待其他资源请求完成之后才能继续发送。

`HTTP2.0`是基于二进制分帧层，`HTTP2.0`可以在共享`TCP`连接的基础上同时发送请求和响应，`HTTP`消息被分解成独立的帧，而不破坏消息本身的语义，交错发出去，另一端根据流标识和首部将他们重新组装起来，通过技术，可以避免`HTTP`旧版本的队头阻塞问题，大大提高传输速率。

那么二进制分帧是怎么回事呢，如何使用这个`二进制分帧`来解决队头阻塞问题呢。

### 二进制分帧

首先，HTTP/2 认为明文传输对机器而言太麻烦了，不方便计算机的解析，因为对于文本而言会有多义性的字符，比如回车换行到底是内容还是分隔符，在内部需要用到状态机去识别，效率比较低。于是 HTTP/2 干脆把报文全部换成二进制格式，全部传输01串，方便了机器的解析。

原来`Headers + Body`的报文格式如今被拆分成了一个个二进制的帧，用`Headers`帧存放头部字段，`Data`帧存放请求体数据。分帧之后，服务器看到的不再是一个个完整的`HTTP`请求报文，而是一堆乱序的二进制帧。这些二进制帧不存在先后关系，因此也就不会排队等待，也就没有了`HTTP`的队头阻塞问题。

通信双方都可以给对方发送二进制帧，这种二进制帧的双向传输的序列，也叫做流(Stream)。HTTP/2 用流来在一个 TCP 连接上来进行多个数据帧的通信，这就是多路复用的概念。

可能你会有一个疑问，既然是乱序首发，那最后如何来处理这些乱序的数据帧呢？

首先要声明的是，所谓的乱序，指的是不同`ID`的`Stream`是乱序的，但同一个`Stream ID`的帧一定是按顺序传输的。二进制帧到达后对方会将 `Stream ID`相同的二进制帧组装成完整的请求报文和响应报文。当然，在二进制帧当中还有其他的一些字段，实现了`优先级`和`流量控制`等功能。

#### HTTP2中的二进制帧是如何设置的

##### 帧结构

每个帧分为帧头和帧体。先是三个字节的帧长度，这个长度表示的是帧体的长度。

然后是帧类型，大概可以分为数据帧和控制帧两种。数据帧用来存放 HTTP 报文，控制帧用来管理流的传输。

接下来的一个字节是帧标志，里面一共有 8 个标志位，常用的有 END_HEADERS表示头数据结束，END_STREAM表示单方向数据发送结束。

后 4 个字节是Stream ID, 也就是流标识符，有了它，接收方就能从乱序的二进制帧中选择出 ID 相同的帧，按顺序组装成请求/响应报文。

##### 流的特性

刚刚谈到了流的状态变化过程，这里顺便就来总结一下流传输的特性:

- 并发性。一个 HTTP/2 连接上可以同时发多个帧，这一点和 HTTP/1 不同。这也是实现多路复用的基础。
- 自增性。流 ID 是不可重用的，而是会按顺序递增，达到上限之后又新开 TCP 连接从头开始。
- 双向性。客户端和服务端都可以创建流，互不干扰，双方都可以作为发送方或者接收方。
- 可设置优先级。可以设置数据帧的优先级，让服务端先处理重要资源，优化用户体验

#### 服务器推送

另外值得一说的是 HTTP/2 的服务器推送(Server Push)。在 HTTP/2 当中，服务器已经不再是完全被动地接收请求，响应请求，它也能新建 stream 来给客户端发送消息，当 TCP 连接建立之后，比如浏览器请求一个 HTML 文件，服务器就可以在返回 HTML 的基础上，将 HTML 中引用到的其他资源文件一起返回给客户端，减少客户端的等待。

#### 请求优先级

把`HTTP`消息分为很多独立帧后，就可以通过优化这些帧的交错和传输顺序进一步优化虚拟。

## HTTPS

**HTTP**是明文传输，传输报文对外完全透明，非常不安全，那如何保证进一步的安全性呢？

由此产生了**HTTPS**，这并不是一个新的协议，而是**HTTP**下面增加了一层`SSL/TLS`协议。简单的说就是`HTTPS = HTTP + SSL/TLS`。

那么什么是`SSL/TLS`呢？

`SSL`就是安全套接层（Secure Sockets Layer），在`OSI`七层网络模型处于会话层（第五层），之前`SSL`出过三个版本，当它发展到第三个大版本的时候才会被标准化，成为`TLS`（传输层安全，Transport Layer Security），并且当做`TLS1.0`版本，准确的说，`TLS1.0 = SSL3.1`。

现在主流的版本是 TLS/1.2, 之前的 TLS1.0、TLS1.1 都被认为是不安全的，在不久的将来会被完全淘汰。因此我们接下来主要讨论的是 TLS1.2, 当然在 2018 年推出了更加优秀的 TLS1.3，大大优化了 TLS 握手过程。

### HTTP向HTTPS演化的过程

第一步：为了黑客劫持通信内容现象的发生，人们想到一个办法：对传输的信息加密（即使黑客获取，也无法破解）。

![](https://raw.githubusercontent.com/dpy0912/PicGo/main/fix-dir/Roaming/picgo/2022/02/18/15-40-24-df7c0d7d808b10f91e4ab5e22397ca77-20220218154024-dcf34.png)


- 对称加密：双方拥有相同的秘钥，信息得到安全传输，但此种方式的缺点是：
  - 不同的客户端，服务器数量庞大，所以双方都需要维护大量的秘钥，维护成本很高。
  - 因每个客户端和服务端的安全级别不同，秘钥容易泄露。

第二步：既然使用对称加密，秘钥维护这么繁琐，那我们可以使用非对称加密来试试。

![](https://raw.githubusercontent.com/dpy0912/PicGo/main/fix-dir/Roaming/picgo/2022/02/18/15-43-33-a1293a6017f290d1efe34d4e4af27265-20220218154332-75d4a.png)

如上图所示，客户端用公钥对请求内容加密，服务器使用私钥加密对内容进行解密，反之亦然，但是上诉过程也存在缺点：

- 公钥是公开的，所以私钥加密会被黑客截取，如果被黑客获取，其可以使用公钥信息解密，获取其中内容。

第三步：非对称加密既然有缺点，那我们就将对称加密，非对称加密结合起来，取其精华，去其糟粕，发挥两者的各自优势：

![](https://raw.githubusercontent.com/dpy0912/PicGo/main/fix-dir/Roaming/picgo/2022/02/18/15-57-17-bce35375e2bd3fbe75e534cc90b08455-20220218155716-ea821.png)

如上图所示

（1）第三步时，客户端说：（咱们后续回话采用对称加密吧，这是对称加密的算法和对称密钥）这段话用公钥进行加密，然后传给服务器

（2）服务器收到信息后，用私钥解密，提取出对称加密算法和对称密钥后，服务器说：（好的）对称密钥加密

（3）后续两者之间信息的传输就可以使用对称加密的方式了

遇到的问题：

（1）客户端如何获得公钥

（2）如何确认服务器是真实的而不是黑客

第四步：获取公钥与确认服务器身份：

![](https://raw.githubusercontent.com/dpy0912/PicGo/main/fix-dir/Roaming/picgo/2022/02/18/16-21-13-cb4dc2dbaae515ae17c6d409061f1fcc-20220218162113-db75f.png)

1、获取公钥

（1）提供一个下载公钥的地址，回话前让客户端去下载。（缺点：下载地址有可能是假的；客户端每次在回话前都先去下载公钥也很麻烦）

（2）回话开始时，服务器把公钥发给客户端（缺点：黑客冒充服务器，发送给客户端假的公钥）

2、那有木有一种方式既可以安全的获取公钥，又能防止黑客冒充呢？ 那就需要用到终极武器了：SSL 证书

![](https://raw.githubusercontent.com/dpy0912/PicGo/main/fix-dir/Roaming/picgo/2022/02/18/16-21-36-e8ab89c96e4fb423379500f641e5ecf3-20220218162135-de77e.png)

如上图所示，在第 ② 步时服务器发送了一个SSL证书给客户端，SSL 证书中包含的具体内容有：

- （1）证书的发布机构CA
- （2）证书的有效期
- （3）公钥
- （4）证书所有者
- （5）签名

3、客户端在接受到服务端发来的SSL证书时，会对证书的真伪进行校验，以浏览器为例说明如下：

- （1）首先浏览器读取证书中的证书所有者、有效期等信息进行一一校验
- （2）浏览器开始查找操作系统中已内置的受信任的证书发布机构CA，与服务器发来的证书中的颁发者CA比对，用于校验证书是否为合法机构颁发
- （3）如果找不到，浏览器就会报错，说明服务器发来的证书是不可信任的。
- （4）如果找到，那么浏览器就会从操作系统中取出 颁发者CA 的公钥，然后对服务器发来的证书里面的签名进行解密
- （5）浏览器使用相同的hash算法计算出服务器发来的证书的hash值，将这个计算的hash值与证书中签名做对比
- （6）对比结果一致，则证明服务器发来的证书合法，没有被冒充
- （7）此时浏览器就可以读取证书中的公钥，用于后续加密了

4、所以通过发送SSL证书的形式，既解决了公钥获取问题，又解决了黑客冒充问题，一箭双雕，HTTPS加密过程也就此形成
所以相比HTTP，HTTPS 传输更加安全

- （1） 所有信息都是加密传播，黑客无法窃听。
- （2） 具有校验机制，一旦被篡改，通信双方会立刻发现。
- （3） 配备身份证书，防止身份被冒充。