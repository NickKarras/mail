define(['jquery', 'underscore', 'backbone', 'js/app-config'], function($, _, Backbone, app) {
	'use strict';

	var ComposeView = Backbone.View.extend({

		initialize: function(args) {
			var self = this;

			this.template = _.template(app.util.tpl.get('compose'));
			this.account = args.account;
			this.folder = args.folder;

			if (args.folder && args.messageId) {
				// fetch reply-to email model
				// post message to main window
				app.util.postMessage('getEmail', {
					folder: args.folder,
					messageId: args.messageId
				}, function(resArgs) {
					var err = resArgs.err;
					if (err) {
						window.alert(JSON.stringify(err));
						return;
					}
					// set mail to reply to
					self.replyTo = resArgs.email;
					args.callback(self);
				});

			} else {
				args.callback(self);
			}
		},

		render: function() {
			var self = this,
				page = $(this.el);

			page.html(this.template());

			// prefill fields for reply
			if (this.replyTo) {
				self.fillFields();
			}

			// handle file picker for attachments
			page.find('#files').on('change', function(e) {
				var files = e.target.files,
					i, reader;

				// check if files exist
				if (!files || files.length < 1) {
					return;
				}

				// init attachments array if non exists
				if (!self._attachments) {
					self._attachments = [];
				}

				function addAttachment(file) {
					reader = new FileReader();

					reader.onloadend = function(f) {
						self._attachments.push({
							fileName: file.name,
							contentType: file.type,
							binStr: f.target.result
						});
					};

					reader.readAsBinaryString(file);
				}

				for (i = 0; i < files.length; i++) {
					addAttachment(files[i]);
				}
			});

			// handle back button
			page.find('#backBtn').on('vmousedown', function(e) {
				e.preventDefault();
				self.goBackToLastPage();
			});
			// handle send button
			page.find('#sendBtn').on('vmousedown', function() {
				self.sendEmail();
			});

			return this;
		},

		fillFields: function() {
			var page = $(this.el),
				re = this.replyTo,
				from = re.from[0],
				subject = re.subject;

			// fill recipient field
			var replyToAddress = from.address;
			page.find('#toInput').val(replyToAddress);

			// fill subject
			subject = 'Re: ' + ((subject) ? subject.replace('Re: ', '') : '');
			page.find('#subjectInput').val(subject);

			// fill text body
			var body = '\n\n' + re.sentDate + ' ' + from.name + ' <' + from.address + '>\n';
			var bodyRows = re.body.split('\n');
			var isHtml = false;
			_.each(bodyRows, function(row) {
				if (row.indexOf('</') !== -1) {
					isHtml = true;
				}
				body += (!isHtml) ? '> ' + row + '\n' : '';
			});
			page.find('#bodyTextarea').text(body);
		},

		/**
		 * Send an email via the email dao
		 */
		sendEmail: function() {
			var self = this,
				page = $(this.el);

			$.mobile.loading('show', {
				text: 'sending...',
				textVisible: true
			});

			// validate recipients
			var to = page.find('#toInput').val().replace(/\s/g, '').split(/[,;]/);
			if (!to || to.length < 1) {
				window.alert('Seperate recipients with a comma!');
				return;
			}

			var email = {
				to: [],
				subject: page.find('#subjectInput').val(),
				body: page.find('#bodyTextarea').val()
			};
			email.from = [{
				name: '',
				address: self.account
			}];
			to.forEach(function(address) {
				email.to.push({
					name: '',
					address: address
				});
			});

			// add attachments
			email.attachments = self._attachments;

			// post message to main window
			app.util.postMessage('sendEmail', {
				email: email
			}, function(resArgs) {
				var err = resArgs.err;

				$.mobile.loading('hide');
				if (err) {
					window.alert(JSON.stringify(err));
					return;
				}

				// break attachments reference from memory
				delete self._attachments;

				self.goBackToLastPage();
			});
		},

		/**
		 * Go back to the last activity
		 * depending from where to compose dialog was opened
		 */
		goBackToLastPage: function() {
			if (this.folder) {
				window.location = '#accounts/' + this.account + '/folders/' + this.folder;
			} else {
				window.location = '#accounts/' + this.account + '/folders';
			}
		}
	});

	return ComposeView;
});