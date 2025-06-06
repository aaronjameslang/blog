### layout: page
title: Writing a README.md


# Writing a `README.md`

A well written readme is important to attracting users and contributors to open source projects, a mark of professionalism when delivering contract work to clients, and the difference between mature application and legacy headache in a corporate environment.

A well written readme will make the project far easier to maintain and extend in future, whether that will be done by contributors, clients, colleagues or (most likely) yourself in six months when you forget this app even existed.

## Worse than Nothing

Worse than any empty or absent readme is an irrelevant one. Often projects bootstraped from templates such as `create-react-app` or `create-next-app` will begin with large technical readmes about how to use the template. Because these are written generically they often describe many features your project doesn't use and can be misleading.

But we can make a better readme without throwing away what useful information might be there. Rename the default readme (`mv README.md create-react-app.md`) and create a new blank one for us to fill in (`touch README.md`).

In your new readme add a link to the template readme like

```markdown
This project was bootstrapped with [Create React App](./create-react-app.md).
```

Now developers can still find information about how to use the underlying template/framework but it won't overwhelm your readme.

## Nothing

If you don't have a readme create one at `README.md`. Non-markdown formats are available but less common. Casing is flexible but all-caps is traditional and attention-grabbing, this should be the first file a newcomer reads.

## Introduction

Start with all the non-technical information that will be useful to anyone who finds your project.

### Title & Aliases

Add a title to the readme with the name of your project, and below list any other names or aliases the project has. Often projects are renamed during early development, either for marketing or to disambiguate from another project with a similar name. In large organisations different business areas might refer to the same system by different names, or a fork of an abandoned open source project may use to re-brand. In any case, listing alternate names with help people understand and discuss your project.

### Description

Next include a description of what the project does. Who is the intended audience? What does it offer to it's users? What is it's value to your organisation? You don't have to answer these questions explicitly, but answers should be apparent from reading the project description. For complex projects it may be best to separate this in to a brief description or tag-line, followed by one or more paragraphs providing detail and context.

Spend a sentence of two setting the scope of your project, outlining what your project does not do can help limit misuse and scope creep.

If your project integrates with other systems or applications as part of a larger solution, note this and include links to their documentation where possible. Most commonly this will be APIs used by your site/app or the front-ends that use your API.

You may want to include an of your application.

### Stakeholders

In the case where you are producing a solution for someone else, record who commissioned this work. This could be a client of yourself or your agency, or a business person in a corporate setting.

Later in the projects life you may need to migrate it to new hosting, make security updates, or just check if the project is still needed; making a note now means maintainers will know who to contact in future.

When appropriate include not only their name but their job title, department, company and contact details. If this person changes roles or leaves the organisation, this information can direct maintainers to the best substitute.

### Example

```markdown
# Project Unicorn (DDP API)

A.K.A. the dedupe API, DDP API

A highly avaiable serverles API for detecting duplicate transactions.

Project Unicorn accepts transaction details and compares them with recently submitted transaction to ensure uniqueness of key feilds such as order number. Project Unicorn does not process transactions or check the validity of card numbers or CCVs.

Project Unicorn is used by the [YellowDeli](https://example.com/acme/yellow-deli) admin portal, as well as the [ACME Payments web site](https://example.com/acme/payment-site) and [mobile app](https://example.com/acme/payment-app)

The primary stakeholder for this project is [Katie Kedler](mailto:katie.kedler@example.com), Manager, Accounts Receivable
```



## Usage

floss: installtion, usage (tool)

site: urls, basic overview of functions

desktop app: installation, usage

api: url, usage

## Installation / Contribution

This might be users installing your app, or it might be developers installing your project so they can work on it.

Prerequesites, tools, libs, environemtn, creds/secrets

contributors might have never developer before, they could be students, managers, or hobysits. Include breif instructions on cloning your project, nvm use, npm instgall, etc

Don't include 'prompt chracters' in shell snippets, these often confuse the uninitiated.

local testing, remote testing, prod testing

Don't assume the person testing is a develop, for api tests include curl commands or similar. If credentials are needed be clear about where to acquire them.

I reccomend seperating deployment/release instructions from contribution, as in many organisations segregation of dutires means these are done by different people.

Include guides to merging (master/develop), tagging, version increments, etc. along with specific guidelines your org has for change managment.

## Monitoring/Ops

Deployments

## Misc

Lastly pay attention to style. Use links, headings, lists and code blocks where appropriate to make your readme easy to read. If you have a long readme, consider creating a table of cntents near the top. Some hosting services such as bitbucket can do this automatially, but you can do if manually if not.
