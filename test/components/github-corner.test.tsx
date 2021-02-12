import React from 'react'

import { GitHubCorner, GitHubCornerProps } from '../../components/github-corner'
import { render } from '../testUtils'

describe('GithubCorner', () => {
  it('matches snapshot', () => {
    const props: GitHubCornerProps = {
      width: '20px',
      color: '#ddd',
      url: 'https://example.com',
    }

    const { asFragment } = render(<GitHubCorner {...props} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
