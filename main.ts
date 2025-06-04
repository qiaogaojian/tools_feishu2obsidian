import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { exec } from 'child_process';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
	isForce: boolean;
	outPath: string;
	wikiUrl: string;
	appId: string;
	appSecret: string;
	enableLog: boolean;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default',
	isForce: false,
	outPath: 'D:/Git/Note/note_obsidian/3.商业/Vectora',
	wikiUrl: 'https://hcn12zstv951.feishu.cn/wiki/settings/7510965301876064257',
	appId: 'cli_a8b478f1783c900c',
	appSecret: 'rbxgxIV441NhdO95EBp2Y0QvNtgt8qcj',
	enableLog: false
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new Notice('This is a notice!');
		});
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('my-plugin-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-sample-modal-simple',
			name: 'Open sample modal (simple)',
			callback: () => {
				new SampleModal(this.app).open();
			}
		});
		// This adds a command to run feishu2md
		this.addCommand({
			id: 'run-feishu2md',
			name: 'Run Feishu to Markdown Sync',
			hotkeys: [
				{
					modifiers: ["Mod", "Alt"],
					key: "o",
				},
			],
			callback: () => {
				const { isForce, outPath, wikiUrl, appId, appSecret, enableLog } = this.settings;
				let command = `feishu2md.exe dl`;
				if (isForce) {
					command += ` --force`;
				}
				command += ` --wiki -o "${outPath}" "${wikiUrl}" --appId "${appId}" --appSecret "${appSecret}"`;

				new Notice('Feishu to Markdown Sync: Starting...');

				if (enableLog) {
					console.log(`Executing command: ${command}`);
				}

				exec(command, (error, stdout, stderr) => {
					if (error) {
						new Notice(`Feishu to Markdown Sync Error: ${error.message}`);
						if (enableLog) {
							console.error(`exec error: ${error}`);
						}
						return;
					}
					if (stderr) {
						new Notice(`Feishu to Markdown Sync Stderr: ${stderr}`);
						if (enableLog) {
							console.error(`stderr: ${stderr}`);
						}
						return;
					}
					new Notice('Feishu to Markdown Sync: Completed successfully!');
					if (enableLog) {
						console.log(`stdout: ${stdout}`);
					}
				});
			}
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'open-sample-modal-complex',
			name: 'Open sample modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new SampleModal(this.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Force Update')
			.setDesc('Enable to force update (--force)')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.isForce)
				.onChange(async (value) => {
					this.plugin.settings.isForce = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Output Path')
			.setDesc('Path for the output files (-o)')
			.addText(text => text
				.setPlaceholder('Enter output path')
				.setValue(this.plugin.settings.outPath)
				.onChange(async (value) => {
					this.plugin.settings.outPath = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Wiki URL')
			.setDesc('Feishu Wiki URL')
			.addText(text => text
				.setPlaceholder('Enter Feishu Wiki URL')
				.setValue(this.plugin.settings.wikiUrl)
				.onChange(async (value) => {
					this.plugin.settings.wikiUrl = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('App ID')
			.setDesc('Feishu App ID')
			.addText(text => text
				.setPlaceholder('Enter App ID')
				.setValue(this.plugin.settings.appId)
				.onChange(async (value) => {
					this.plugin.settings.appId = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('App Secret')
			.setDesc('Feishu App Secret')
			.addText(text => text
				.setPlaceholder('Enter App Secret')
				.setValue(this.plugin.settings.appSecret)
				.onChange(async (value) => {
					this.plugin.settings.appSecret = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Enable Log')
			.setDesc('Enable detailed logging for feishu2md command execution.')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.enableLog)
				.onChange(async (value) => {
					this.plugin.settings.enableLog = value;
					await this.plugin.saveSettings();
				}));
	}
}
