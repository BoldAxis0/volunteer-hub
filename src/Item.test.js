import { render, screen } from '@testing-library/react';
import Item from './Item';

test('Should render the Box component with default props', () => {
    render(<Item />);
    expect(screen.getByRole('region')).toBeInTheDocument();
});