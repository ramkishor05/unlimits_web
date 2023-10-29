import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@material-ui/styles';
import { Card, CardContent, CardHeader, Divider, Typography } from '@material-ui/core';

// constant
const headerSX = {
    '& .MuiCardHeader-action': { mr: 0 }
};

//-----------------------|| CUSTOM MAIN CARD ||-----------------------//

const MainCard = React.forwardRef(
    (
        {
            border = true,
            boxShadow,
            children,
            content = true,
            contentClass,
            button,
            contentSX,
            darkTitle,
            secondary,
            shadow,
            sx = {},
            title,
            ...others
        },
        ref
    ) => {
        const theme = useTheme();

        return (
            <Card
                ref={ref}
                {...others}
                sx={{
                    border: border ? '1px solid' : 'none',
                    borderColor: theme.palette.primary[200] + 75,
                    ':hover': {
                        boxShadow: boxShadow ? (shadow ? shadow : '0 2px 1px 0 rgb(32 40 45 / 8%)') : 'inherit'
                    },
                    ...sx
                }}
            >
                {/* card header and action */}
                {!darkTitle && title && <CardHeader sx={headerSX} title={title} 
                action={
                    button
                        ? <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'baseline',
                            justifyContent: 'flex-end'
                        }}>                 
                            <div style={{ 
                                display: 'flex',
                                alignItems: 'baseline',
                                justifyContent: 'flex-end'
                            }}>
                                { 
                                    button 
                                }
                            </div>
                        </div>
                        : null
                } />}
                {darkTitle && title && (
                    <CardHeader 
                    sx={headerSX} 
                    title={<Typography variant="h3">{title}</Typography>}
                     action={secondary} />
                )}
               
                {/* content & header divider */}
                {title && <Divider />}
                
                {/* card content */}
                {content && (
                    <CardContent sx={contentSX} className={contentClass}>
                        {children}
                    </CardContent>
                )}
                {!content && children}
            </Card>
        );
    }
);

MainCard.propTypes = {
    border: PropTypes.bool,
    boxShadow: PropTypes.bool,
    children: PropTypes.node,
    content: PropTypes.bool,
    contentClass: PropTypes.string,
    contentSX: PropTypes.object,
    darkTitle: PropTypes.bool,
    secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
    shadow: PropTypes.string,
    sx: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
};

export default MainCard;
