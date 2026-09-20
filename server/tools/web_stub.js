export const webStub = {
  name: 'web_stub',
  description: 'Web search is not live in this build. Explains the limitation honestly.',
  available: false,
  async execute() {
    return {
      status: 'unavailable',
      message:
        'Live web search is not wired in VOID AI v1. I can still reason from context you provide, or you can paste relevant text/links for me to work with.',
    };
  },
};
