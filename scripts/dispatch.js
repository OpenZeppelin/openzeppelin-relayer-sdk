module.exports = ({ github, context }) =>
  github.rest.actions.createWorkflowDispatch({
    owner: context.repo.owner,
    repo: context.repo.repo,
    workflow_id: 'publish.yml',
    ref: process.env.REF || process.env.GITHUB_REF_NAME,
  });
