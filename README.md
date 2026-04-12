## 🚀 How to Contribute (Step-by-Step)

### 1️⃣ Fork the Repository

Click the **Fork** button on GitHub (top right).
This creates your own copy of the repo.

### 2️⃣ Clone Your Fork Locally

```bash
git clone https://github.com/Pratham2703005/robot-toast.git
```
3️⃣ Create a New Branch

Always create a new branch for your changes.
```bash
git checkout -b fix/short-description-of-change
```

Example:
```bash
git checkout -b fix/sticky-buttons-ui
```
4️⃣ Install Dependencies
```bash
npm install
```
5️⃣ Run the Project Locally
```bash
npm run dev
```

Make your changes and test them properly.

6️⃣ Commit Your Changes

Write clean and descriptive commit messages.
```bash
git add .
git commit -m "fix(playground): make show and clear buttons sticky for better UX"
```

7️⃣ Push to Your Fork
```bash
git push origin fix/short-description-of-change
```

8️⃣ Open a Pull Request

- Go to your fork on GitHub and click:
- Compare & Pull Request
- In the PR description:
    - Explain what you changed
    - Reference the issue (if any)

📌 Contribution Guidelines

- Keep changes focused and minimal
- Follow existing code style
- Test before submitting PR
- Do not commit unnecessary files
- Avoid large unrelated changes in a single PR

🛠 Reporting Issues
- If you find a bug or UX improvement:
    - Go to the Issues tab
    - Click New Issue
    - Clearly describe the problem or improvement

🙌 After Your PR I will:
- Review your code
- Suggest changes (if needed)
- Merge when approved
- Once merged, your contribution becomes part of the project history 🎉

Thanks for helping improve robot-toast Playground!
Let’s build something creative 

## Some Cmds
```
npm login      
npm whoami  

or 
npm config set //registry.npmjs.org/:_authToken=NEW_TOKEN //bypass 2FA
npm whoami

npm publish --tag beta --access public //for beta
or 
npm publish --access public //for official version

//for set to latest
npm dist-tag add robot-toast@1.0.1-beta-0 latest

npm version patch
npm version minor
npm version major
npm version 1.0.1
```