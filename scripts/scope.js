const { execSync } = require('child_process')

const getBranchName = () => {
    try {
        const branch = execSync('git branch --show-current').toString().trim();
        const match = branch.match(/cnk-\d+/);
        return match ? match[0] : undefined;
    } catch {
        return undefined;
    }
};

console.log(getBranchName());
