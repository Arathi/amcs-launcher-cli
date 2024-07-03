import { Command } from "commander";
import { pino } from "pino";
import pkg from "../package.json";

const logger = pino({
  name: "amcl",
  transport: {
    target: "pino-pretty",
  },
});

async function main() {
  const program = new Command();

  program
    .name("amcl")
    .description("Avalon Minecraft Launcher")
    .version(pkg.version);

  const account = program.command("account").description("账户管理");
  account
    .command("login")
    .description("登录")
    .option("-u, --username <username>", "用户名")
    .option("-p, --password <password>", "密码")
    .option("-s, --server <yggdrasilServer>", "Yggdrasil服务器")
    .option("-o, --offline", "离线模式")
    .action((opts) => {
      const { username, password, server, offline } = opts;
      logger.info(
        `登录 ${username}/${password}@${server} (${offline ? "离线" : "在线"})`
      );
    });
  account
    .command("list")
    .description("列表")
    .action((opts) => {
      logger.info("已登记账户如下：");
    });

  const install = program.command("install").description("安装Minecraft");
  install
    .option("-v, --version-name <versionName>", "版本名称")
    .option("-g, --game-version <minecraftVersion>", "Minecraft版本")
    .option("-l, --mod-loader <modLoaderType>", "模组加载器")
    .option("--forge <forgeVersion>", "安装Forge，可指定版本")
    .option("--fabric <fabricVersion>", "安装Fabric，可指定版本")
    .option("--quilt <quiltVersion>", "安装Quilt，可指定版本")
    .option("--neo-forge <neoForgeVersion>", "安装NeoForge，可指定版本")
    .action((opts) => {
      const {
        versionName,
        gameVersion,
        modLoader,
        forge,
        fabric,
        quilt,
        neoForge,
      } = opts;
      logger.info("安装Minecraft");
      logger.info(opts);
    });

  const launch = program.command("launch").description("启动");
  launch
    .option("-v, --version-name <version>", "版本名称")
    .option("-s, --skip", "跳过检查")
    .action((opts) => {
      const { versionName, skip } = opts;
      logger.info("正在启动");
    });

  program.parse(process.argv);
}

main();
